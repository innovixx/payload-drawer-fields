'use client'
import type { ChangeEvent } from 'react'

import { getTranslation } from '@payloadcms/translations'
import { fieldBaseClass, FieldDescription, FieldError, FieldLabel, ReactSelect, RenderCustomComponent, useTranslation } from '@payloadcms/ui'
import React from 'react'

import type { CustomInputProps } from './types.js'

import './index.scss'

export const CustomInput: React.FC<CustomInputProps> = (props) => {
  const {
    AfterInput,
    BeforeInput,
    className,
    Description,
    description,
    Error,
    hasMany,
    inputRef,
    Label,
    label,
    localized,
    maxRows,
    onChange,
    onKeyDown,
    path,
    placeholder,
    readOnly,
    required,
    rtl,
    showError,
    style,
    value,
    valueToRender,
  } = props

  const { i18n, t } = useTranslation()

  return (
    <div
      className={[
        fieldBaseClass,
        'custom-input',
        className,
        showError && 'error',
        readOnly && 'read-only',
        hasMany && 'has-many',
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={
          <FieldLabel label={label} localized={localized} path={path} required={required} />
        }
      />
      <div className={`${fieldBaseClass}__wrap`}>
        <RenderCustomComponent
          CustomComponent={Error}
          Fallback={<FieldError path={path} showError={showError} />}
        />
        {BeforeInput}
        {hasMany ? (
          <ReactSelect
            className={`field-${path.replace(/\./g, '__')}`}
            disabled={readOnly}
            // prevent adding additional options if maxRows is reached
            filterOption={() =>
              !maxRows ? true : !(Array.isArray(value) && maxRows && value.length >= maxRows)
            }
            isClearable
            isCreatable
            isMulti
            isSortable
            noOptionsMessage={() => {
              const isOverHasMany = Array.isArray(value) && value.length >= maxRows
              if (isOverHasMany) {
                return t('validation:limitReached', { max: maxRows, value: value.length + 1 })
              }
              return null
            }}
            onChange={onChange}
            options={[]}
            placeholder={t('general:enterAValue')}
            showError={showError}
            value={valueToRender}
          />
        ) : (
          <>
            <input
              data-rtl={rtl}
              disabled={readOnly}
              id={`field-${path?.replace(/\./g, '__')}`}
              name={path}
              onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void}
              onKeyDown={onKeyDown}
              placeholder={getTranslation(placeholder, i18n)}
              ref={inputRef}
              type="text"
              value={value || ''}
            />
            <span>123</span>
          </>
        )}
        {AfterInput}
        <RenderCustomComponent
          CustomComponent={Description}
          Fallback={<FieldDescription description={description} path={path} />}
        />
      </div>
    </div>
  )
}
