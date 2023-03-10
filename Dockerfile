# ################################################################
# ###                        Base image                        ###
# ################################################################
FROM node:16-alpine as base

WORKDIR /opt

COPY . .

WORKDIR /opt/backend

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

RUN npm i npm@latest -g

RUN chown node:node -R /opt
USER node

# ################################################################
# ###                     development image                    ###
# ################################################################
FROM base as development

RUN npm install --quiet --unsafe-perm --no-progress --no-audit --include=dev

CMD npm run dev

# ################################################################
# ###                    backend build image                   ###
# ################################################################

FROM base as backendbuild

RUN npm install --quiet --unsafe-perm --no-progress --no-audit --include=dev

RUN npx tsc -p ./tsconfig.json

# ################################################################
# ###                   frontend build image                   ###
# ################################################################

FROM base as frontendbuild

WORKDIR /opt/frontend

RUN npm install --quiet --unsafe-perm --no-progress --no-audit --include=dev

RUN npm run build

# ################################################################
# ###                     production image                     ###
# ################################################################

FROM base as production

COPY --from=backendbuild --chown=node:node /opt/backend/dist/ /opt/backend/dist/
COPY --from=frontendbuild --chown=node:node /opt/frontend/dist/ /opt/frontend/dist/

RUN npm install --quiet --unsafe-perm --no-progress --no-audit --omit=dev

CMD node --es-module-specifier-resolution=node dist/app.js
