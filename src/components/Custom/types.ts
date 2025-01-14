import type { Option, ReactSelectAdapterProps } from '@payloadcms/ui/dist/elements/ReactSelect/types'
import type { StaticDescription, StaticLabel } from 'payload'
import type { ChangeEvent } from 'react'
import type React from 'react'

export type SharedCustomFieldProps =
  | {
    readonly hasMany?: false
    readonly onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  }
  | {
    readonly hasMany?: true
    readonly onChange?: ReactSelectAdapterProps['onChange']
  }

export type CustomInputProps = {
  readonly AfterInput?: React.ReactNode
  readonly BeforeInput?: React.ReactNode
  readonly className?: string
  readonly Description?: React.ReactNode
  readonly description?: StaticDescription
  readonly Error?: React.ReactNode
  readonly inputRef?: React.RefObject<HTMLInputElement>
  readonly Label?: React.ReactNode
  readonly label?: StaticLabel
  readonly localized?: boolean
  readonly maxRows?: number
  readonly minRows?: number
  readonly onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  readonly path: string
  readonly placeholder?: Record<string, string> | string
  readonly readOnly?: boolean
  readonly required?: boolean
  readonly rtl?: boolean
  readonly showError?: boolean
  readonly style?: React.CSSProperties
  readonly value?: string
  readonly valueToRender?: Option[]
} & SharedCustomFieldProps
