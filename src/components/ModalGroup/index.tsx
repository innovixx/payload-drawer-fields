'use client'

import type { FieldClientComponent, FieldPaths, GroupFieldClient } from 'payload'

import { getTranslation } from '@payloadcms/translations'
import { Drawer, DrawerToggler, ErrorPill, fieldBaseClass, FieldDescription, FieldLabel, RenderCustomComponent, SaveButton, useField, useFormSubmitted, useModal, useTranslation, withCondition, XIcon } from '@payloadcms/ui'
import React, { useMemo } from 'react'

import './index.scss'
import { mergeFieldStyles } from '../../utils/mergeFieldStyles'
import { RenderFields } from '../RenderFields'
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
            <GearIcon />
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
