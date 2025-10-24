import { status, t } from 'elysia'
import { saveMultipleFiles } from '@/utils/uploader';
import { CardModel } from '@/models/card';
import type { ImageData } from '@/models/schema';

export const CreateCardSchema = t.Object({
    name: t.String({ minLength: 1 }),
    description: t.Optional(t.String()),
    serialNumber: t.Optional(t.String()),
    category: t.String({ minLength: 1 }),
    grade: t.Optional(t.Numeric()),
    grader: t.Optional(t.Union([
        t.Literal('psa'),
        t.Literal('bgs'),
        t.Literal('cgc'),
        t.Literal('none')
    ])),
    images: t.Optional(t.Files({
        type: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
        maxSize: 5 * 1024 * 1024, // 5MB per file
    }))
});

export const CardResponse = t.Object({
    id: t.String(),
    sellerId: t.String(),
    name: t.String(),
    description: t.Union([t.String(), t.Null()]),
    serialNumber: t.Union([t.String(), t.Null()]),
    category: t.String(),
    images: t.Union([t.Array(t.Object({
        filename: t.String(),
        url: t.String()
    })), t.Null()]),
    grade: t.Union([t.Number(), t.Null()]),
    grader: t.Union([t.String(), t.Null()]),
    createdAt: t.Date(),
    updatedAt: t.Date()
});

export const ApiErrorResponse = t.Object({
    message: t.String(),
});

export const PaginationResponse = t.Object({
    total: t.Number(),
    hasNext: t.Boolean(),
    hasPrevious: t.Boolean(),
    offset: t.Number(),
    limit: t.Number(),
});

export const CardsListResponse = t.Object({
    cards: t.Array(CardResponse),
    pagination: PaginationResponse,
});

export namespace CardController {
    export async function createCard(
        userId: string,
        data: {
            name: string;
            description?: string;
            serialNumber?: string;
            category: string;
            grade?: number;
            grader?: 'psa' | 'bgs' | 'cgc' | 'none';
            images?: File[];
        }
    ) {
        try {
            let uploadedImages: ImageData[] = [];

            if (data.images && data.images.length > 0) {
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                const maxSize = 10 * 1024 * 1024;

                for (const file of data.images) {
                    if (!allowedTypes.includes(file.type)) {
                        return status(400, {
                            message: `Invalid file type: ${file.type}. Allowed types: ${allowedTypes.join(', ')}`
                        });
                    }

                    if (file.size > maxSize) {
                        return status(400, {
                            message: `File ${file.name} is too large. Max size: 10MB`
                        });
                    }
                }

                const uploadResults = await saveMultipleFiles(data.images, {
                    folder: 'cards',
                    keepOriginalName: false
                });

                const failed = uploadResults.filter(r => !r.success);
                if (failed.length > 0) {
                    return status(500, {
                        message: `Failed to upload ${failed.length} image(s): ${failed.map(f => f.error).join(', ')}`
                    });
                }

                uploadedImages = uploadResults.map(r => ({
                    filename: r.filename,
                    url: r.url
                }));
            }

            const newCard = await CardModel.createCard({
                sellerId: userId,
                name: data.name,
                description: data.description,
                serialNumber: data.serialNumber,
                category: data.category,
                images: uploadedImages.length > 0 ? uploadedImages : undefined,
                grade: data.grade,
                grader: data.grader,
            });

            return status(201, newCard);
        } catch (error: any) {
            console.error('Card creation error:', error);
            return status(500, { message: error.message || 'Failed to create card' });
        }
    }

    export async function getCardById(cardId: string) {
        try {
            const card = await CardModel.getCardById(cardId);

            if (!card) {
                return status(404, { message: 'Card not found' });
            }

            return status(200, card);
        } catch (error: any) {
            console.error('Get card error:', error);
            return status(500, { message: error.message || 'Failed to get card' });
        }
    }

    export async function getCardsList(
        userType: 'player' | 'seller' | 'admin',
        userId: string,
        offset: number = 0,
        limit: number = 10,
        search?: string
    ) {
        try {
            if (userType !== 'admin' && userType !== 'seller') {
                return status(403, { message: 'Forbidden: Only sellers and admins can access card lists' });
            }

            let result;
            if (userType === 'admin') {
                result = await CardModel.getAllCards(offset, limit, search);
            } else {
                result = await CardModel.getCardsBySellerId(userId, offset, limit, search);
            }

            const pagination = {
                total: result.total,
                hasNext: offset + limit < result.total,
                hasPrevious: offset > 0,
                offset,
                limit,
            };

            return status(200, {
                cards: result.cards,
                pagination,
            });
        } catch (error: any) {
            console.error('Get cards list error:', error);
            return status(500, { message: error.message || 'Failed to get cards list' });
        }
    }
}