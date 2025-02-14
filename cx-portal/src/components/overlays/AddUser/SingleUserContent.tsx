import { useTranslation } from 'react-i18next'
import { Input } from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUsersToAdd } from 'features/admin/userDeprecated/actions'
import debounce from 'lodash.debounce'
import { IHashMap, UserInput } from 'types/MainTypes'
import Patterns from 'types/Patterns'

const InputDefinitions = {
  firstname: {
    key: 'firstname',
    i18n: 'global.field.first',
    helperText: '',
    pattern: Patterns.NAME,
    value: '',
    valid: false,
  },
  lastname: {
    key: 'lastname',
    i18n: 'global.field.last',
    helperText: '',
    pattern: Patterns.NAME,
    value: '',
    valid: false,
  },
  email: {
    key: 'email',
    i18n: 'global.field.email',
    helperText: '',
    pattern: Patterns.MAIL,
    value: '',
    valid: false,
  },
}

export const SingleUserContent = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [inputValid, setInputValid] = useState<boolean>(false)
  const [userInputs, setUserInputs] =
    useState<IHashMap<UserInput>>(InputDefinitions)

  const debouncedValidation = useMemo(
    () =>
      debounce((inputs: IHashMap<UserInput>) => {
        const check = Object.values(inputs).reduce(
          (all, input) => all && input.pattern.test(input.value),
          true
        )
        setInputValid(check)
      }, 300),
    [setInputValid]
  )

  const doValidate = useCallback(
    (key: string, value: string) => {
      const inputs = { ...userInputs }
      const current = inputs[key]
      current.value = value
      setUserInputs(inputs)
      debouncedValidation(inputs)
    },
    [debouncedValidation, userInputs]
  )

  useEffect(() => {
    dispatch(
      setUsersToAdd(
        inputValid
          ? {
              userName: userInputs.email.value,
              email: userInputs.email.value,
              firstName: userInputs.firstname.value,
              lastName: userInputs.lastname.value,
              message: 'you have been invited to catena-x',
            }
          : {}
      )
    )
  }, [inputValid, userInputs, dispatch])

  return (
    <Box sx={{ marginTop: '30px' }}>
      {Object.values(userInputs).map(({ key, i18n, helperText }) => (
        <Input
          sx={{ marginBottom: '30px' }}
          key={key}
          label={t(i18n)}
          placeholder={t(i18n)}
          helperText={helperText}
          error={userInputs[key].valid}
          onChange={(e) => doValidate(key, e.target.value)}
        />
      ))}
    </Box>
  )
}
