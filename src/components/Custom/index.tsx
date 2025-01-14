'use client'
import type { TextFieldClientComponent } from 'payload'

import { useConfig, useField, useLocale, withCondition } from '@payloadcms/ui'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { isFieldRTL } from '../../utils/isFIeldRTL.js'
import './index.scss'
import { mergeFieldStyles } from '../../utils/mergeFieldStyles.js'

// eslint-disable-next-line payload/no-jsx-import-statements
import { CustomInput } from './Input.jsx'

const CustomFieldComponent: TextFieldClientComponent = (props) => {
  const {
    field,
    field: {
      admin: { className, description, placeholder, rtl } = {},
      hasMany,
      label,
      localized,
      maxLength,
      maxRows,
      minLength,
      minRows,
      required,
    },
    inputRef,
    path,
    readOnly,
    validate,
  } = props

  const locale = useLocale()

  const {
    config: {
      localization
    }
  } = useConfig()

  const memoizedValidate = useCallback(
    (value, options) => {
      if (typeof validate === 'function') {
        return validate(value, { ...options, maxLength, minLength, required })
      }
    },
    [validate, minLength, maxLength, required],
  )

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error, Label } = {},
    setValue,
    showError,
    value,
  } = useField({
    path,
    validate: memoizedValidate,
  })

  const renderRTL = isFieldRTL({
    fieldLocalized: localized,
    fieldRTL: rtl,
    locale,
    localizationConfig: localization || undefined,
  })

  const [valueToRender, setValueToRender] = useState<
    { id: string; label: string; value: { value: number } }[]
  >([])

  const handleHasManyChange = useCallback(
    (selectedOption) => {
      if (!readOnly) {
        let newValue
        if (!selectedOption) {
          newValue = []
        } else if (Array.isArray(selectedOption)) {
          newValue = selectedOption.map((option) => option.value?.value || option.value)
        } else {
          newValue = [selectedOption.value?.value || selectedOption.value]
        }

        setValue(newValue)
      }
    },
    [readOnly, setValue],
  )

  useEffect(() => {
    if (hasMany && Array.isArray(value)) {
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setValueToRender(
        value.map((val, index) => {
          return {
            id: `${val}${index}`,
            label: `${val}`,
            value: {
              toString: () => `${val}${index}`,
              value: val?.value || val,
            },
          }
        }),
      )
    }
  }, [value, hasMany])

  const styles = useMemo(() => mergeFieldStyles(field), [field])

  return (
    <CustomInput
      AfterInput={AfterInput}
      BeforeInput={BeforeInput}
      className={className}
      Description={Description}
      description={description}
      Error={Error}
      hasMany={hasMany}
      inputRef={inputRef}
      Label={Label}
      label={label}
      localized={localized}
      maxRows={maxRows}
      minRows={minRows}
      onChange={
        hasMany
          ? handleHasManyChange
          : (e) => {
            setValue(e.target.value)
          }
      }
      path={path}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
      rtl={renderRTL}
      showError={showError}
      style={styles}
      value={(value as string) || ''}
      valueToRender={valueToRender}
    />
  )
}

export const CustomField = withCondition(CustomFieldComponent)
