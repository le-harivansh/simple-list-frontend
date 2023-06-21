// https://on.cypress.io/api

describe('List CRUD', () => {
  const updatedItemTitle = "A new updated title"

  context("READ", () => {
    it('renders all the page components', () => {
      cy.visit('/')

      cy.contains("Simple List")
    })
  })

  context("CREATE", () => {
    it('creates a new list item', () => {
      cy.visit('/')

      const newItemTitle = 'A new item';

      cy.get('[data-test="list-item-title-input"]').type(newItemTitle)
      cy.get('[data-test="create-new-list-item-button"]').click()

      cy.contains(newItemTitle)
    })
  })

  context("UPDATE", () => {
    it('updates an existing list item', () => {
      cy.visit('/')

      cy.get('[data-cy="list-item-0"] [data-test="list-item-edit-button"]').click()


      cy.get('[data-test="list-item-title-input"]').type(`{selectall}{backspace}${updatedItemTitle}`)
      cy.get('[data-test="list-item-update-button"]').click()

      cy.contains(updatedItemTitle)
    })
  })

  context("DELETE", () => {
    it('deletes an existing list item', () => {
      cy.visit('/')

      cy.get('[data-cy="list-item-0"] [data-test="list-item-delete-button"]').click()

      cy.should('not.contain', updatedItemTitle)
    })
  })
})
