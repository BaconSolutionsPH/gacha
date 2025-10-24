import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "../routes/seller";
import type Route1 from "../routes/card";
import type Route2 from "../routes/auth";


    export type APIRoutes = ElysiaWithBaseUrl<"/api/seller", typeof Route0>
              & ElysiaWithBaseUrl<"/api/card", typeof Route1>
              & ElysiaWithBaseUrl<"/api/auth", typeof Route2>
