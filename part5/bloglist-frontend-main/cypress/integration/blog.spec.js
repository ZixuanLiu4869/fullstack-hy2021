describe('test login show', function(){
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'root',
            username: 'root',
            password: 'root'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
        cy.login({username: 'root', password: 'root'})
    })

    it('test if login form shows', function (){
        cy.contains('log in to application')
        cy.contains('usename')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('input:first').type('root')
            cy.get('input:last').type('root')
            cy.contains('login').click()

            cy.contains('root logged=in')
        })

        it('fails with wrong credentials', function(){
            cy.get('input:first').type('root')
            cy.get('input:last').type('wrong')
            cy.contains('login').click()

            cy.contains('Wrong username or password')
        })
    })

    describe('When logged in', function(){
        beforeEach(function(){
            cy.login({username: 'root', password: 'root'})
        })

        it('A blog can be created', function(){
            cy.contains('Create').click()
            cy.get('#title').type('test')
            cy.get('#author').type('lzk')
            cy.get("#url").type('www.test.com')
            cy.get('#create-button').click()
            cy.contains('a new blog Title by Author added')
        })
    })

    describe('When blog is created', function(){
        beforeEach(function(){
            cy.login({username: 'root', password: 'root'})
            cy.createBlog({
                title: 'test',
                author: 'lzk',
                url: 'www.test.url',
                likes: 6,
            })
            cy.contains('View').click()
        })

        it('A blog can be liked by user', function(){
            cy.contains('likes 6')
            cy.contains('like').click()
            cy.contians('likes 7')
        })

        it('A blog can be deleted by its owner', function(){
            cy.contains('delete')
            cy.contains('delete').click()
            cy.should('not.contain', 'www.test.url')
        })

        it.only('A blog can not be deleted by others', function() {
            const user = {
                name: 'test',
                username: 'test',
                password: 'test'
            }
            cy.request('POST', 'http://localhost:3003/api/users/', user)
            cy.visit('http://localhost:3000')
            cy.login({username: 'test', password: 'test'})

            cy.contains('View').click()
            cy.should('not.contain', 'delete')
        })
    })
})