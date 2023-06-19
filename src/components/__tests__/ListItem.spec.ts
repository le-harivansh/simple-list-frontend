import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ListItem from '../ListItem.vue'

describe('ListItem', () => {
  it('renders properly', () => {
    const wrapper = mount(ListItem, { props: { title: 'Item No. 1' } })
    expect(wrapper.text()).toContain('Item No. 1')
  })
})
