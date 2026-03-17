---
title: Actions
description: Quick action list for common AI chat interactions.
---

## When To Use

Use it as an operation area below messages, such as retry, edit, copy, feedback, and audio controls.

## Examples

<demo src="./demo/basic.vue">Basic</demo>
<demo src="./demo/sub.vue">Sub Menu Items</demo>
<demo src="./demo/preset.vue">Preset Composition</demo>
<demo src="./demo/variant.vue">Variants</demo>
<demo src="./demo/fade-in.vue">Fade In</demo>

## API

### Actions

| Property        | Description                                | Type                                                                 | Default        |
| --------------- | ------------------------------------------ | -------------------------------------------------------------------- | -------------- |
| `items`         | Action item list                           | `ItemType[]`                                                         | `[]`           |
| `onClick`       | Callback when an item is clicked           | `({ item, key, keyPath, domEvent }) => void`                         | -              |
| `dropdownProps` | Dropdown options (forwarded to `Dropdown`) | `DropdownProps`                                                      | -              |
| `variant`       | Visual variant                             | `'borderless' \| 'filled' \| 'outlined'`                             | `'borderless'` |
| `fadeIn`        | Enable fade-in animation                   | `boolean`                                                            | `false`        |
| `fadeInLeft`    | Enable left-to-right fade-in animation     | `boolean`                                                            | `false`        |
| `classes`       | Semantic class names                       | `Partial<Record<'root' \| 'item' \| 'itemDropdown', string>>`        | -              |
| `styles`        | Semantic styles                            | `Partial<Record<'root' \| 'item' \| 'itemDropdown', CSSProperties>>` | -              |

### ItemType

| Property               | Description                                                  | Type                                                                       | Default   |
| ---------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------- | --------- |
| `key`                  | Unique item key                                              | `string \| number`                                                         | -         |
| `label`                | Item tooltip label                                           | `string`                                                                   | -         |
| `icon`                 | Item icon                                                    | `VNodeChild`                                                               | -         |
| `onItemClick`          | Item click callback (higher priority than `Actions.onClick`) | `(info?: ItemType) => void`                                                | -         |
| `danger`               | Danger state                                                 | `boolean`                                                                  | `false`   |
| `subItems`             | Sub action items                                             | `Omit<ItemType, 'subItems' \| 'triggerSubMenuAction' \| 'actionRender'>[]` | -         |
| `triggerSubMenuAction` | Sub-menu trigger action                                      | `'hover' \| 'click'`                                                       | `'hover'` |
| `actionRender`         | Custom rendered item content                                 | `VNodeChild \| ((item: ItemType) => VNodeChild)`                           | -         |

### Actions.Feedback

| Property   | Description                    | Type                               | Default     |
| ---------- | ------------------------------ | ---------------------------------- | ----------- |
| `value`    | Feedback value                 | `'like' \| 'dislike' \| 'default'` | `'default'` |
| `onChange` | Feedback value change callback | `(value) => void`                  | -           |

### Actions.Copy

| Property | Description  | Type         | Default |
| -------- | ------------ | ------------ | ------- |
| `text`   | Text to copy | `string`     | `''`    |
| `icon`   | Copy icon    | `VNodeChild` | -       |

### Actions.Audio

| Property | Description  | Type                                             | Default     |
| -------- | ------------ | ------------------------------------------------ | ----------- |
| `status` | Audio status | `'loading' \| 'error' \| 'running' \| 'default'` | `'default'` |

### Actions.Item

| Property      | Description   | Type                                             | Default     |
| ------------- | ------------- | ------------------------------------------------ | ----------- |
| `status`      | Item status   | `'loading' \| 'error' \| 'running' \| 'default'` | `'default'` |
| `label`       | Tooltip label | `string`                                         | -           |
| `defaultIcon` | Default icon  | `VNodeChild`                                     | -           |
| `runningIcon` | Running icon  | `VNodeChild`                                     | -           |
