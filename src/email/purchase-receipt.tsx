import { orderType } from "@/lib/schemas/order";
import { toGBP } from "@/lib/utils";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const formatDate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

function PurchaseReceipt({ order }: { order: orderType }) {
  return (
    <Html>
      <Preview>Your purchase receipt from Luma</Preview>
      <Tailwind>
        <Head></Head>
        <Body className="bg-white font-sans">
          <Container className="max-w-xl">
            <Heading>Thank you for your purchase, {order.user.name}!</Heading>
            <Section>
              <Row>
                <Column>
                  <Text className="text-muted-foreground mr-4 mb-0 text-nowrap whitespace-nowrap">
                    Order ID
                  </Text>
                  <Text className="mr-4 mb-0">{order.id.toString()}</Text>
                </Column>

                <Column>
                  <Text className="text-muted-foreground mr-4 mb-0 text-nowrap whitespace-nowrap">
                    Purchase Date
                  </Text>
                  <Text className="mr-4 mb-0">
                    {formatDate.format(new Date(order.paidAt!))}
                  </Text>
                </Column>

                <Column>
                  <Text className="text-muted-foreground mr-4 mb-0 text-nowrap whitespace-nowrap">
                    Price Paid
                  </Text>
                  <Text className="mr-4 mb-0">{toGBP(order.totalPrice)}</Text>
                </Column>
              </Row>
            </Section>

            <Section className="border-muted-foreground/50 my-4 rounded-xl border border-dashed p-4 md:p-6">
              {order.orderItems.map((item) => (
                <Row key={item.productId} className="mt-8">
                  <Column className="w-20">
                    <Img
                      width={80}
                      alt={item.name}
                      className="rounded-xl"
                      src={
                        item.image?.startsWith("/")
                          ? `${process.env.NEXT_PUBLIC_URL}${item.image}`
                          : item.image
                      }
                    />
                  </Column>

                  <Column className="align-top">
                    {item.name} x {item.qty}
                  </Column>
                  <Column className="align-top" align="right">
                    {toGBP(item.price)}
                  </Column>
                </Row>
              ))}

              {[
                { name: "Items", price: order.itemsPrice },
                { name: "Tax", price: order.taxPrice },
                { name: "Shipping", price: order.shippingPrice },
                { name: "Total", price: order.totalPrice },
              ].map(({ name, price }) => (
                <Row key={name} className="py-1">
                  <Column align="right">{name}: </Column>
                  <Column align="right" width={70} className="align-top">
                    <Text className="m-0">{toGBP(price)}</Text>
                  </Column>
                </Row>
              ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default PurchaseReceipt;
