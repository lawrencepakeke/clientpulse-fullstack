import mongoose from "mongoose";
import dotenv from "dotenv";
import Client from "../models/Client.js";
import Service from "../models/service.js";
import Transaction from "../models/transaction.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    await Transaction.deleteMany();
    await Client.deleteMany();
    await Service.deleteMany();

    console.log("Old data removed");

    const clients = await Client.insertMany([
      {
        name: "Nordic Growth Media",
        industry: "Marketing",
        region: "Stockholm",
        segment: "SME"
      },
      {
        name: "Skåne Fitness Group",
        industry: "Fitness",
        region: "Malmö",
        segment: "Enterprise"
      },
      {
        name: "BluePeak Logistics",
        industry: "Logistics",
        region: "Gothenburg",
        segment: "Enterprise"
      },
      {
        name: "BrightPath Education",
        industry: "Education",
        region: "Lund",
        segment: "SME"
      },
      {
        name: "UrbanBite Kitchens",
        industry: "Food Service",
        region: "Helsingborg",
        segment: "Startup"
      }
    ]);

    const services = await Service.insertMany([
      {
        name: "Customer Retention Audit",
        category: "Analytics",
        price: 12000
      },
      {
        name: "Sales Performance Dashboard",
        category: "Reporting",
        price: 18000
      },
      {
        name: "Monthly Revenue Analysis",
        category: "Analytics",
        price: 9500
      },
      {
        name: "Client Segmentation Report",
        category: "Strategy",
        price: 14000
      },
      {
        name: "Lead Conversion Review",
        category: "Marketing",
        price: 11000
      }
    ]);

    const transactions = [
      {
        clientId: clients[0]._id,
        serviceId: services[1]._id,
        amount: 18000,
        date: new Date("2026-03-05"),
        source: "Referral"
      },
      {
        clientId: clients[0]._id,
        serviceId: services[2]._id,
        amount: 9500,
        date: new Date("2026-03-22"),
        source: "LinkedIn"
      },
      {
        clientId: clients[1]._id,
        serviceId: services[0]._id,
        amount: 12000,
        date: new Date("2026-02-15"),
        source: "Website"
      },
      {
        clientId: clients[1]._id,
        serviceId: services[3]._id,
        amount: 14000,
        date: new Date("2026-03-18"),
        source: "Referral"
      },
      {
        clientId: clients[2]._id,
        serviceId: services[1]._id,
        amount: 18000,
        date: new Date("2026-01-29"),
        source: "Outbound"
      },
      {
        clientId: clients[2]._id,
        serviceId: services[4]._id,
        amount: 11000,
        date: new Date("2026-02-20"),
        source: "Website"
      },
      {
        clientId: clients[3]._id,
        serviceId: services[2]._id,
        amount: 9500,
        date: new Date("2026-03-10"),
        source: "LinkedIn"
      },
      {
        clientId: clients[3]._id,
        serviceId: services[0]._id,
        amount: 12000,
        date: new Date("2026-04-02"),
        source: "Referral"
      },
      {
        clientId: clients[4]._id,
        serviceId: services[4]._id,
        amount: 11000,
        date: new Date("2026-02-08"),
        source: "Instagram"
      },
      {
        clientId: clients[4]._id,
        serviceId: services[3]._id,
        amount: 14000,
        date: new Date("2026-03-27"),
        source: "Website"
      }
    ];

    await Transaction.insertMany(transactions);

    console.log("Seed data inserted successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedData();