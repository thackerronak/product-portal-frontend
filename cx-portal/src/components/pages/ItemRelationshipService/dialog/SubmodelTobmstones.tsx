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

import { Box, Divider } from '@mui/material'
import { SubmodelDescriptors } from 'features/irs/types'
import { DetailGrid } from '../DetailGrid'
import { Tombstones } from 'features/irs/types'
import { useSelector } from 'react-redux'
import {
  getTombstonesByEndpointAdress,
  getSubmodelPaloadBySubmodelId,
} from 'features/irs/slice'
import Highlight from 'react-highlight'


interface props {
  subModel: SubmodelDescriptors
  // hasTombstones?: (x:boolean) => void
  // setPayload?: (x:boolean) => void
}

export const SubmodelTobmstones = ({ subModel }: props) => {
  const tombstones: Tombstones[] | [] = useSelector((state) => {
    if (subModel != null) {
      return getTombstonesByEndpointAdress(
        state,
        subModel.endpoints[0].protocolInformation.endpointAddress
      )
    } else {
      return []
    }
  })

  let hasTombstoness = tombstones.length > 0 ? true : false

  // hasTombstones(hasTombstoness)

  const submodelId = subModel.identification
  const submodelPayload = useSelector((state) => {
    if (submodelId) {
      return getSubmodelPaloadBySubmodelId(state, submodelId)
    } else {
      return []
    }
  })

  const hasPayload = () => (submodelPayload.length > 0 ? true : false)

  return (
    <>
      {hasTombstoness && (
        <Box key={'tombstones'}>
          <h1>Submodel Tombstones</h1>
          {tombstones.map((stone) => {
            return (
              <Box key={`stone_${stone.catenaXId}_${stone.endpointURL}`}>
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={'Timestamp:'}
                  content={stone.processingError.lastAttempt}
                />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={'Error Detail:'}
                  content={
                    <Highlight>
                      {JSON.stringify(
                        stone.processingError.errorDetail,
                        null,
                        2
                      )}
                    </Highlight>
                  }
                />
              </Box>
            )
          })}
        </Box>
      )}

      {hasPayload() && (
        <>
          <h1>Submodel Payload</h1>
          {submodelPayload.map((payload) => {
            return (
              <Box
                key={`payload_${payload.identification}_${payload.aspectType}`}
              >
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={'Payload:'}
                  content={
                    <Highlight>
                      {JSON.stringify(payload.payload.toString(), null, 2)}
                    </Highlight>
                  }
                />
              </Box>
            )
          })}
        </>
      )}
    </>
  )
}
