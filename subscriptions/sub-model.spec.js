const db = require('../database/dbConfig');

const { addSub } = require('./sub-model');

describe('subs model', function () {

    describe('addSub()', function () {
        beforeEach(async () => {
            await db('subs').truncate()
        });

        it('should add the provided subscription', async function (){
            await addSub({
                
                monthlyFee: "$5",
                lengthOfSubscription: "4/4/4040",
                nameOfSubscription: "Name",
                orgId: 1
            });
 
            const subs = await db('subs')
            
            expect(subs).toHaveLength(1);
        })
    })
})