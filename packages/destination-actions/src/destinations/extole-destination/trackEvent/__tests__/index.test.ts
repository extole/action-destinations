import nock from 'nock'
import { createTestEvent, createTestIntegration } from '@segment/actions-core'
import Destination from '../../index'

const testDestination = createTestIntegration(Destination)

const EXTOLE_API_KEY = 'TEST API KEY'
const receivedAt = '2023-06-07T05:21:15.449Z'
const anonymousId = 'some-anonymous-id'
const userId = 'uuid-000001'

describe('ExtoleDestinationV2.trackEvent', () => {
  it('should validate action fields', async () => {
    const event = createTestEvent({
      type: 'track',
      event: 'Test Segment Event',
      receivedAt,
      anonymousId,
      userId,
      properties: {}
    })

    nock('https://api.extole.io').post('/v5/events').reply(200, {})

    const responses = await testDestination.testAction('trackEvent', {
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
          "data": Object {
            "email": undefined,
            "event_time": "2023-06-07T05:21:15.449Z",
            "extole_app": "Segment Destination App",
            "extole_consumer_ip": "8.8.8.8",
            "partner_anonymous_id": "some-anonymous-id",
            "partner_user_id": "uuid-000001",
          },
          "event_name": "Test Segment Event",
        }
      `)
  })
})
