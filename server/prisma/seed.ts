import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: 'Mysz Logitech G502',
      description: 'Gamingowa mysz komputerowa z precyzyjnym sensorem.',
      price: 249.99,
      image: '/images/products/mouse.webp',
      images: ['/images/products/mouse.webp'],
    },
    {
      name: 'Klawiatura mechaniczna',
      description: 'Klawiatura gamingowa z podswietleniem RGB.',
      price: 329.99,
      image: '/images/products/keyboard.webp',
      images: ['/images/products/keyboard.webp'],
    },
    {
      name: 'Sluchawki gamingowe',
      description: 'Sluchawki nauszne z mikrofonem.',
      price: 199.99,
      image: '/images/products/headset.webp',
      images: ['/images/products/headset.webp'],
    },
    {
      name: 'Podkladka pod mysz XXL',
      description: 'Duza podkladka na biurko z antyposlizgowym spodem.',
      price: 79.99,
      image: '/images/products/mousepad.webp',
      images: ['/images/products/mousepad.webp'],
    },
  ];

  for (const product of products) {
    const existingProduct = await prisma.product.findFirst({
      where: { name: product.name },
    });

    if (!existingProduct) {
      await prisma.product.create({
        data: product,
      });

      console.log(`Created product: ${product.name}`);
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
