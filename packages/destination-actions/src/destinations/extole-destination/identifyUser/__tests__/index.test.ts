import nock from 'nock'
import { createTestEvent, createTestIntegration } from '@segment/actions-core'
import Destination from '../../index'

const testDestination = createTestIntegration(Destination)

const EXTOLE_API_KEY = 'TEST API KEY'
const receivedAt = '2023-06-07T05:21:15.449Z'
const anonymousId = 'some-anonymous-id'

describe('ExtoleDestinationV2.identifyUser', () => {
  it('should validate action fields', async () => {
    const event = createTestEvent({
      type: 'identify',
      receivedAt,
      anonymousId,
      traits: { trait1: 'text', trait2: 100 }
    })

    nock('https://api.extole.io').post('/v5/events/identify').reply(200, {})

    const responses = await testDestination.testAction('identifyUser', {
      event,
      useDefaultMappings: true,
      settings: {
        apiKey: EXTOLE_API_KEY
      }
    })
    expect(responses.length).toBe(1)
    expect(responses[0].status).toBe(200)
    expect(responses[0].data).toMatchObject({})
    expect(responses[0].options.json).toMatchInlineSnapshot(`
        Object {
          "email": undefined,
          "extole_app": "Segment Destination App",
          "extole_consumer_ip": "8.8.8.8",
          "partner_anonymous_id": "some-anonymous-id",
          "partner_user_id": "user1234",
          "traits": Object {
            "trait1": "text",
            "trait2": 100,
          },
        }
      `)
  })
})
