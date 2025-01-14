'use client'

import type { FieldClientComponent, FieldPaths, GroupFieldClient } from 'payload'

import { getTranslation } from '@payloadcms/translations'
import { Drawer, DrawerToggler, ErrorPill, fieldBaseClass, FieldDescription, FieldLabel, RenderCustomComponent, RenderFields, SaveButton, useField, useFormSubmitted, useModal, useTranslation, withCondition, XIcon } from '@payloadcms/ui'
import React, { useMemo } from 'react'

import './index.scss'
import { mergeFieldStyles } from '../../utils/mergeFieldStyles'
import { GearIcon } from './GearIcon'
import { GroupProvider } from './provider'

type ExtendedGroupFieldClientComponent = FieldClientComponent<{ type?: string } & GroupFieldClient, { toggleButtonType?: 'button' | 'settingIcon' } & FieldPaths>

const baseClass = 'modal-group-field'

export const ModalGroupFieldComponent: ExtendedGroupFieldClientComponent = (props) => {
  const {
    field,
    field: { name, admin: { className, description } = {}, fields, label },
    path,
    permissions,
    readOnly,
    schemaPath: schemaPathFromProps,
    toggleButtonType,
  } = props
  const schemaPath = schemaPathFromProps ?? name

  const { i18n, t } = useTranslation()
  const { customComponents: { AfterInput, BeforeInput, Description, Label } = {}, errorPaths } = useField({ path })
  const submitted = useFormSubmitted()
  const errorCount = errorPaths.length
  const fieldHasErrors = submitted && errorCount > 0

  const { closeModal } = useModal();

  const styles = useMemo(() => mergeFieldStyles(field), [field])

  const CustomLabel = (
    <>
      {Boolean(Label || Description || label || fieldHasErrors) && (
        <div className={`${baseClass}__header`}>
          <div className={`${baseClass}__header__inner`}>
            {Boolean(Label || Description || label) && (
              <header>
                <RenderCustomComponent
                  CustomComponent={Label}
                  Fallback={
                    <h3 className={`${baseClass}__title`}>
                      <FieldLabel
                        as="span"
                        label={getTranslation(label, i18n)}
                        localized={false}
                        path={path}
                        required={false}
                      />
                    </h3>
                  }
                />
                <RenderCustomComponent
                  CustomComponent={Description}
                  Fallback={<FieldDescription description={description} path={path} />}
                />
              </header>
            )}
            {fieldHasErrors && <ErrorPill count={errorCount} i18n={i18n} withMessage />}
          </div>
          <button
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            aria-label={t('general:close')}
            className={`${baseClass}__header__close`}
            id={`close-drawer__${`${name}-modal`}`}
            onClick={() => closeModal(`${name}-modal`)}
            type="button"
          >
            <XIcon />
          </button>
        </div>
      )}
    </>
  )

  return (
    <div className={`modal-group-drawer__container`}>
      <DrawerToggler
        className={['btn',
          toggleButtonType !== 'settingIcon' && 'btn--style-secondary',
          toggleButtonType !== 'settingIcon' && 'modal-group-drawer-button',
          fieldHasErrors && `modal-group-drawer-button--has-error`,
          toggleButtonType === 'settingIcon' && 'modal-group-drawer-button--setting-icon',
        ].filter(Boolean)
          .join(' ')}
        slug={`${name}-modal`}
      >
        {
          toggleButtonType === 'button' ? (
            <>
              Open {getTranslation(label, i18n)}
            </>
          ) : (
            <svg height={12} viewBox="0 0 512 512" width={12} xmlns="http://www.w3.org/2000/svg">
              <path d="M256 0c17 0 33.6 1.7 49.8 4.8 7.9 1.5 21.8 6.1 29.4 20.1 2 3.7 3.6 7.6 4.6 11.8l9.3 38.5c1.4 5.8 11.2 11.5 16.9 9.8l38-11.2c4-1.2 8.1-1.8 12.2-1.9 16.1-.5 27 9.4 32.3 15.4 22.1 25.1 39.1 54.6 49.9 86.3 2.6 7.6 5.6 21.8-2.7 35.4-2.2 3.6-4.9 7-8 10L459 246.3c-4.2 4-4.2 15.5 0 19.5l28.7 27.3c3.1 3 5.8 6.4 8 10 8.2 13.6 5.2 27.8 2.7 35.4-10.8 31.7-27.8 61.1-49.9 86.3-5.3 6-16.3 15.9-32.3 15.4-4.1-.1-8.2-.8-12.2-1.9L366 427c-5.7-1.7-15.5 4-16.9 9.8l-9.3 38.5c-1 4.2-2.6 8.2-4.6 11.8-7.7 14-21.6 18.5-29.4 20.1-16.2 3.1-32.8 4.8-49.8 4.8s-33.6-1.7-49.8-4.8c-7.9-1.5-21.8-6.1-29.4-20.1-2-3.7-3.6-7.6-4.6-11.8l-9.3-38.5c-1.4-5.8-11.2-11.5-16.9-9.8l-38 11.2c-4 1.2-8.1 1.8-12.2 1.9-16.1.5-27-9.4-32.3-15.4-22-25.1-39.1-54.6-49.9-86.3-2.6-7.6-5.6-21.8 2.7-35.4 2.2-3.6 4.9-7 8-10L53 265.7c4.2-4 4.2-15.5 0-19.5l-28.8-27.3c-3.1-3-5.8-6.4-8-10-8.2-13.6-5.2-27.8-2.6-35.3 10.8-31.7 27.8-61.1 49.9-86.3 5.3-6 16.3-15.9 32.3-15.4 4.1.1 8.2.8 12.2 1.9L146 85c5.7 1.7 15.5-4 16.9-9.8l9.3-38.5c1-4.2 2.6-8.2 4.6-11.8 7.7-14 21.6-18.5 29.4-20.1C222.4 1.7 239 0 256 0zm-37.9 51.4-8.5 35.1c-7.8 32.3-45.3 53.9-77.2 44.6l-34.5-10.2c-16.5 19.3-29.5 41.7-38 65.7l26.2 24.9c24 22.8 24 66.2 0 89l-26.2 24.9c8.5 24 21.5 46.4 38 65.7l34.6-10.2c31.8-9.4 69.4 12.3 77.2 44.6l8.5 35.1c24.6 4.5 51.3 4.5 75.9 0l8.5-35.1c7.8-32.3 45.3-53.9 77.2-44.6l34.6 10.2c16.5-19.3 29.5-41.7 38-65.7l-26.2-24.9c-24-22.8-24-66.2 0-89l26.2-24.9c-8.5-24-21.5-46.4-38-65.7l-34.6 10.2c-31.8 9.4-69.4-12.3-77.2-44.6l-8.5-35.1c-24.6-4.5-51.3-4.5-75.9 0zM208 256a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm48 96a96 96 0 1 1 0-192 96 96 0 1 1 0 192z" />
            </svg>
          )
        }
      </DrawerToggler>
      <Drawer
        className={`modal-group-drawer`}
        Header={CustomLabel}
        slug={`${name}-modal`}
        title={getTranslation(label, i18n)}
      >
        <div
          className={[
            fieldBaseClass,
            baseClass,
            `${baseClass}--top-level`,
            fieldHasErrors && `${baseClass}--has-error`,
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          id={`field-${path?.replace(/\./g, '__')}`}
          style={styles}
        >
          <GroupProvider>
            <div className={`${baseClass}__wrap`}>
              {BeforeInput}
              <RenderFields
                fields={fields}
                margins="small"
                parentIndexPath=""
                parentPath={path}
                parentSchemaPath={schemaPath}
                permissions={permissions === true ? permissions : permissions?.fields}
                readOnly={readOnly}
              />
            </div>
          </GroupProvider>
          {AfterInput}
        </div>
        <div className={`${baseClass}__save-button-container`}>
          <SaveButton
            label='Save Changes'
          />
        </div>
      </Drawer>
    </div>

  )
}

export const ModalGroupField = withCondition(ModalGroupFieldComponent)
