import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "../routes/seller";
import type Route1 from "../routes/auth";


    export type APIRoutes = ElysiaWithBaseUrl<"/api/seller", typeof Route0>
              & ElysiaWithBaseUrl<"/api/auth", typeof Route1>
