import { GraphbackCRUDOperationType } from "@graphback/core"
/**
 * Provides way to map runtime topics for subscriptions for specific types and object names
 */
export const subscriptionTopicMapping = (tiggerType: GraphbackCRUDOperationType, objectName: string) => {
    return `${tiggerType}_${objectName}`.toUpperCase();
}
