// Generated file. DO NOT MODIFY IT BY HAND.

export interface Payload {
  /**
   * The event name
   */
  name: string
  /**
   * When the event occurred.
   */
  time: string | number
  /**
   * The unique user identifier
   */
  partner_user_id?: string
  /**
   * The anonymous user identifier
   */
  partner_anonymous_id?: string
  /**
   * User email address
   */
  email?: string
  /**
   * Properties of the event
   */
  properties?: {
    [k: string]: unknown
  }
  /**
   * Consumer device IP Address
   */
  extole_consumer_ip?: string
}
