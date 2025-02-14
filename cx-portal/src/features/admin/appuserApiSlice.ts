/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PaginResult, PaginFetchArgs } from 'cx-portal-shared-components'
import i18next from 'i18next'
import { PAGE_SIZE } from 'types/Constants'
import { apiBaseQuery } from 'utils/rtkUtil'
import { TenantUser } from './userApiSlice'

export type AppRole = {
  roleId: string
  role: string
  description: string
}

export const apiSlice = createApi({
  reducerPath: 'rtk/apps/roles',
  baseQuery: fetchBaseQuery(apiBaseQuery()),
  endpoints: (builder) => ({
    fetchAppRoles: builder.query<AppRole[], string>({
      query: (appId: string) =>
        `/api/administration/user/app/${appId}/roles?lang=${i18next.language}`,
    }),
    fetchAppUsers: builder.query<PaginResult<TenantUser>, PaginFetchArgs>({
      query: (fetchArgs) =>
        `/api/administration/user/owncompany/apps/${
          fetchArgs.args!.appId
        }/users?size=${PAGE_SIZE}&page=${fetchArgs.page}`,
    }),
  }),
})

export const { useFetchAppRolesQuery, useFetchAppUsersQuery } = apiSlice
