import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "../routes/index";
import type Route1 from "../routes/auth/auth


    export type APIRoutes = ElysiaWithBaseUrl<"/api", typeof Route0>
              & ElysiaWithBaseUrl<"/api/auth", typeof Route1>
