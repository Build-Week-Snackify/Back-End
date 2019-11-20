const db = require('../database/dbConfig');
const { add } = require('./snack-model');


describe('snacks model', function () {

    describe('add()', function () {
        beforeEach(async () => {
            await db('snacks').truncate();
        })

        it('should insert the provided snack', async function() {

            await add({
                   name: 'Blueberries',
                    numberOfServings: 2,
                    totalWeight: 5,
                    price: 4.99,
                    subId: 1
            })

            const snacks = await db('snacks')
            
            expect(snacks).toHaveLength(1);
        })
    })
})