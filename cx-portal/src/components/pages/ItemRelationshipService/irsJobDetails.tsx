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
import { jobinfo } from 'features/irs/types'
import Highlight from 'react-highlight'
import { DetailGrid } from './DetailGrid'
import { Grid, Box, Divider, useTheme } from '@mui/material'
interface props {
  job: jobinfo | undefined
}

export const IrsJobDetails = ({ job }: props) => {
  const theme = useTheme()
  const beautifulJson = (json: any) => {
    return <Highlight>{JSON.stringify(json, null, 2)}</Highlight>
  }

  return (
    <>
      <section
        style={{
          padding: '34px 20px',
        }}
      >
        <Box className="irs-job-details">
          <Box className="irs-job-details-header">
            <header>IRS Job Details</header>
          </Box>
          <Box className="irs-job-details-content">
            {job && (
              <Grid>
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid topic={'Job ID:'} content={job?.jobId} />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={'global Asset ID:'}
                  content={job.globalAssetId}
                />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid topic={'Job State:'} content={job.jobState} />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={'Exception:'}
                  content={beautifulJson(job.exception)}
                />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid topic={'Job Created:'} content={job.createdOn} />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid topic={'Job Started:'} content={job.startedon} />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={'Job last modified:'}
                  content={job.lastModifiedOn}
                />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={'Job Completed:'}
                  content={job.jobCompleted}
                />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid topic={'Job Owner:'} content={job.owner} />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={'Job Summary:'}
                  content={beautifulJson(job.summary)}
                />
                <Divider sx={{ mb: 2, mr: -2, ml: -2 }} />
                <DetailGrid
                  topic={'Job Parameter:'}
                  content={beautifulJson(job.jobParameter)}
                />
              </Grid>
            )}

            {/* <Highlight className="irs-job-details-content-code">
              {JSON.stringify(job, null, 2)}
            </Highlight> */}
          </Box>
        </Box>
      </section>
    </>
  )
}
