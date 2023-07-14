import React from "react";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CartIconContainer, CartIcon } from "../components/checkout.styles";
import { colors } from '../../infrastructure/theme/colors';

export const CheckoutErrorScreen = ({ route }) => {
  const { error = "" } = route.params;
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="close" />
        <Text variant="label">{error}</Text>
      </CartIconContainer>
    </SafeArea>
  );
};