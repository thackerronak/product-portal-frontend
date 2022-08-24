const LOCAL_SERVICES_FRONTEND = 'https://portal.dev.demo.ftcpro.co'
const LOCAL_SERVICES_BACKEND = 'https://portal-backend.dev.demo.ftcpro.co'
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
  if (hostname === 'portal.ftcpro.co')
    return 'https://centralidp.ftcpro.co/auth'
  return 'https://centralidp.dev.demo.ftcpro.co/auth'
}

export const getClientId = () => 'Cl2-CX-Portal'

//TODO: remove hard coded url and activate after setup of BPDM Api
export const getBpdmApiBase = () => {
  const hostname = getHostname()
  if (hostname === 'portal.int.demo.ftcpro.co')
    return 'https://catenax-bpdm-int.demo.ftcpro.co/api'
  if (hostname === 'portal.ftcpro.co')
    return 'https://catenax-bpdm-dev.demo.ftcpro.co/api'
  return 'https://partners-pool.dev.demo.ftcpro.co/v2/api'
}
//export const getBpdmApiBase = () =>
//  isLocal()
//    ? LOCAL_SERVICES_BPDM
//    : window.location.origin.replace('portal', 'bpdm')

export const getSemanticApiBase = () => {
  const hostname = getHostname()
  if (hostname === 'portal.int.demo.ftcpro.co')
    return 'https://semantics.int.demo.ftcpro.co/'
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
