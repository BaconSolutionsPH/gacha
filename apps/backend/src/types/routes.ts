import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "../routes/pool";
import type Route1 from "../routes/seller";
import type Route2 from "../routes/card";
import type Route3 from "../routes/auth";


    export type APIRoutes = ElysiaWithBaseUrl<"/api/pool", typeof Route0>
              & ElysiaWithBaseUrl<"/api/seller", typeof Route1>
              & ElysiaWithBaseUrl<"/api/card", typeof Route2>
              & ElysiaWithBaseUrl<"/api/auth", typeof Route3>
