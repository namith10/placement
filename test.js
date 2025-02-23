const transactions = [
  {
    _id: "67bae8e78de25df9a6cdcfa7",
    title: "Fjallraven  Foldsack No 1 Backpack Fits 15 Laptops",
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop up to 15 inches in the padded sleeve your everyday",
    price: 329.85,
    category: "men's clothing",
    dateOfSale: "2021-11-27T14:59:54.000Z",
    sold: false,
    __v: 0,
  },
  {
    _id: "67bae8e78de25df9a6cdcfa8",
    title: "Mens Casual Premium Slim Fit TShirts ",
    description:
      "Slimfitting style contrast raglan long sleeve threebutton henley placket light weight  soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a threebutton placket.",
    price: 44.6,
    category: "men's clothing",
    dateOfSale: "2021-10-27T14:59:54.000Z",
    sold: false,
    __v: 0,
  },
  {
    _id: "67bae8e78de25df9a6cdcfa9",
    title: "Mens Cotton Jacket",
    description:
      "great outerwear jackets for SpringAutumnWinter suitable for many occasions such as working hiking camping mountainrock climbing cycling traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father husband or son in this thanksgiving or Christmas Day.",
    price: 615.89,
    category: "men's clothing",
    dateOfSale: "2022-07-27T14:59:54.000Z",
    sold: true,
    __v: 0,
  },
  {
    _id: "67bae8e78de25df9a6cdcfaa",
    title: "Mens Casual Slim Fit",
    description:
      "The color could be slightly different between on the screen and in practice.  Please note that body builds vary by person therefore detailed size information should be reviewed below on the product description.",
    price: 31.98,
    category: "men's clothing",
    dateOfSale: "2021-10-27T14:59:54.000Z",
    sold: false,
    __v: 0,
  },
  {
    _id: "67bae8e78de25df9a6cdcfab",
    title:
      "John Hardy Womens Legends Naga Gold  Silver Dragon Station Chain Bracelet",
    description:
      "From our Legends Collection the Naga was inspired by the mythical water dragon that protects the oceans pearl. Wear facing inward to be bestowed with love and abundance or outward for protection.",
    price: 6950,
    category: "jewelery",
    dateOfSale: "2022-06-27T14:59:54.000Z",
    sold: false,
    __v: 0,
  },
  {
    _id: "67bae8e78de25df9a6cdcfac",
    title: "Solid Gold Petite Micropave ",
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    price: 168,
    category: "jewelery",
    dateOfSale: "2021-09-27T14:59:54.000Z",
    sold: true,
    __v: 0,
  },
  {
    _id: "67bae8e78de25df9a6cdcfad",
    title: "White Gold Plated Princess",
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement Wedding Anniversary Valentines Day...",
    price: 99.9,
    category: "jewelery",
    dateOfSale: "2022-06-27T14:59:54.000Z",
    sold: true,
    __v: 0,
  },
  {
    _id: "67bae8e78de25df9a6cdcfae",
    title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    description:
      "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    price: 32.97,
    category: "jewelery",
    dateOfSale: "2021-11-27T14:59:54.000Z",
    sold: false,
    __v: 0,
  },
  {
    _id: "67bae8e78de25df9a6cdcfaf",
    title: "WD 2TB Elements Portable External Hard Drive  USB 30 ",
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity Compatibility Formatted NTFS for Windows 10 Windows 8.1 Windows 7 Reformatting may be required for other operating systems Compatibility may vary depending on users hardware configuration and operating system",
    price: 704,
    category: "electronics",
    dateOfSale: "2022-07-27T14:59:54.000Z",
    sold: true,
    __v: 0,
  },
  {
    _id: "67bae8e78de25df9a6cdcfb0",
    title: "SanDisk SSD PLUS 1TB Internal SSD  SATA III 6 Gbs",
    description:
      "Easy upgrade for faster boot up shutdown application load and response As compared to 5400 RPM SATA 2.5 hard drive Based on published specifications and internal benchmarking tests using PCMark vantage scores Boosts burst write performance making it ideal for typical PC workloads The perfect balance of performance and reliability Readwrite speeds of up to 535MBs450MBs Based on internal testing Performance may vary depending upon drive capacity host device OS and application.",
    price: 763,
    category: "electronics",
    dateOfSale: "2022-03-27T14:59:54.000Z",
    sold: false,
    __v: 0,
  },
];

function getStatistics(month) {
  // Ensure month is two-digit format (e.g., "03" for March)
  const monthStr = month.toString().padStart(2, "0");

  // Filter transactions for the selected month irrespective of the year
  const filteredTransactions = transactions.filter(
    (t) => new Date(t.dateOfSale).getMonth() + 1 === parseInt(monthStr)
  );

  // Calculate total sale amount of sold items
  const totalSaleAmount = filteredTransactions
    .filter((t) => t.sold)
    .reduce((sum, t) => sum + t.price, 0);

  // Count total sold and unsold items
  const totalSoldItems = filteredTransactions.filter((t) => t.sold).length;
  const totalNotSoldItems = filteredTransactions.length - totalSoldItems;

  // Return JSON response
  return {
    totalSaleAmount,
    totalSoldItems,
    totalNotSoldItems,
  };
}

// Example Usage:
const month = 3; // July
console.log(getStatistics(month));
