interface MercadoPago {
  new (publicKey: string, options?: { locale: string }): any;
}

interface Window {
  MercadoPago: typeof MercadoPago;
}