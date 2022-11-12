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

const LOCAL_SERVICES_FRONTEND = 'https://portal.dev.demo.ftcpro.co'
const LOCAL_SERVICES_BACKEND = 'https://portal-backend.dev.ftcpro.co'
//const LOCAL_SERVICES_CENTRALIDP = 'https://centralidp.dev.demo.ftcpro.co'
//const LOCAL_SERVICES_BPDM = 'https://bpdm.dev.demo.ftcpro.co'

export const getHostname = () => window.location.hostname

export const isLocal = () => getHostname() === 'localhost'

export const getApiBase = () =>
  isLocal()
    ? LOCAL_SERVICES_BACKEND
    : window.location.origin.replace('portal', 'portal-backend')

export const getAssetBase = () =>
  `${isLocal() ? LOCAL_SERVICES_FRONTEND : ''}/assets`

export const getCentralIdp = () => {
  const hostname = getHostname()
  if (hostname === 'portal.int.demo.ftcpro.co')
    return 'https://centralidp.demo.ftcpro.co/auth'
  if (hostname === 'portal-pen.dev.demo.ftcpro.co')
    return 'https://centralidp-pen.dev.demo.ftcpro.co/auth'
  if (hostname === 'portal.beta.demo.ftcpro.co')
    return 'https://centralidp.beta.demo.ftcpro.co/auth'
  if (hostname === 'portal.pre-prod.demo.ftcpro.co')
    return 'https://centralidp.pre-prod.demo.ftcpro.co/auth'
  if (hostname === 'portal.ftcpro.co')
    return 'https://centralidp.ftcpro.co/auth'
  return 'https://centralidp.dev.demo.ftcpro.co/auth'
}

export const getClientId = () => 'Cl2-CX-Portal'

//TODO: remove hard coded url and activate after setup of BPDM Api
export const getBpdmApiBase = () => {
  const hostname = getHostname()
  if (hostname === 'portal.int.demo.ftcpro.co')
    return 'https://partners-pool.int.demo.ftcpro.co/api'
  if (hostname === 'portal-pen.dev.demo.ftcpro.co')
    return 'https://partners-pool-pen.dev.demo.ftcpro.co/api'
  if (hostname === 'portal.beta.demo.ftcpro.co')
    return 'https://partners-pool.beta.demo.ftcpro.co/api'
  if (hostname === 'portal.pre-prod.demo.ftcpro.co')
    return 'https://partners-pool.pre-prod.demo.ftcpro.co/api'
  if (hostname === 'portal.ftcpro.co')
    return 'https://partners-pool.ftcpro.co/api'
  return 'https://partners-pool.dev.demo.ftcpro.co/api'
}
//export const getBpdmApiBase = () =>
//  isLocal()
//    ? LOCAL_SERVICES_BPDM
//    : window.location.origin.replace('portal', 'bpdm')

export const getSemanticApiBase = () => {
  const hostname = getHostname()
  if (hostname === 'portal.int.demo.ftcpro.co')
    return 'https://semantics.int.demo.ftcpro.co/'
  if (hostname === 'portal-pen.dev.demo.ftcpro.co')
    return 'https://semantics-pen.dev.demo.ftcpro.co/'
  if (hostname === 'portal.beta.demo.ftcpro.co')
    return 'https://semantics.beta.demo.ftcpro.co/'
  if (hostname === 'portal.pre-prod.demo.ftcpro.co')
    return 'https://semantics.pre-prod.demo.ftcpro.co/'
  if (hostname === 'portal.ftcpro.co')
    return 'https://semantics.ftcpro.co/'
  return 'https://semantics.dev.demo.ftcpro.co/'
}

export const getClientIdSemantic = () => 'Cl3-CX-Semantic'

export const getClientIdDigitalTwin = () => 'Cl4-CX-DigitalTwin'

const EnvironmentService = {
  isLocal,
  getHostname,
  getApiBase,
  getAssetBase,
  getBpdmApiBase,
  getCentralIdp,
  getSemanticApiBase,
  getClientId,
  getClientIdSemantic,
  getClientIdDigitalTwin,
}

export default EnvironmentService
