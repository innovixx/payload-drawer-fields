import type { Field, GroupField } from "payload"

export const modalFields = (
  options: {
    toggleButtonType?: 'blockSettingIcon' | 'button' | 'settingIcon'
  } & Omit<GroupField, 'type'>,
): Field => {
  const { name, toggleButtonType = 'button', ...rest } = options

  return {
    ...rest,
    name: name || 'custom',
    type: 'group',
    admin: {
      ...rest?.admin,
      components: {
        ...rest?.admin?.components,
        Field: {
          clientProps: {
            toggleButtonType,
          },
          path: '@innovixx/payload-drawer-fields/components#ModalGroupField'
        },
      },
    },
  }
}