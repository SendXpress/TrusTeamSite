import { 
  User, InsertUser, 
  Appointment, InsertAppointment,
  WaitlistEntry, InsertWaitlistEntry,
  ContactMessage, InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Appointment methods
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[]>;
  getAppointment(id: number): Promise<Appointment | undefined>;
  
  // Waitlist methods
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistEntries(): Promise<WaitlistEntry[]>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private appointments: Map<number, Appointment>;
  private waitlistEntries: Map<number, WaitlistEntry>;
  private contactMessages: Map<number, ContactMessage>;
  
  private userCurrentId: number;
  private appointmentCurrentId: number;
  private waitlistCurrentId: number;
  private contactMessageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.appointments = new Map();
    this.waitlistEntries = new Map();
    this.contactMessages = new Map();
    
    this.userCurrentId = 1;
    this.appointmentCurrentId = 1;
    this.waitlistCurrentId = 1;
    this.contactMessageCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Appointment methods
  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = this.appointmentCurrentId++;
    const createdAt = new Date();
    
    // Explicitly create the appointment object with all fields
    const appointment: Appointment = { 
      id,
      name: insertAppointment.name,
      email: insertAppointment.email,
      date: insertAppointment.date,
      time: insertAppointment.time,
      createdAt,
      phone: insertAppointment.phone ?? null,
      projectDescription: insertAppointment.projectDescription ?? null
    };
    
    this.appointments.set(id, appointment);
    return appointment;
  }
  
  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }
  
  async getAppointment(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }
  
  // Waitlist methods
  async createWaitlistEntry(insertEntry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    const id = this.waitlistCurrentId++;
    const createdAt = new Date();
    // Ensure all optional fields are set to null if not provided
    const entry: WaitlistEntry = { 
      ...insertEntry, 
      id, 
      createdAt,
      company: insertEntry.company ?? null,
      interest: insertEntry.interest ?? null,
      newsletter: insertEntry.newsletter ?? null
    };
    this.waitlistEntries.set(id, entry);
    return entry;
  }
  
  async getWaitlistEntries(): Promise<WaitlistEntry[]> {
    return Array.from(this.waitlistEntries.values());
  }
  
  // Contact message methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageCurrentId++;
    const createdAt = new Date();
    
    // Explicitly create the message object with all fields
    const message: ContactMessage = { 
      id,
      name: insertMessage.name,
      email: insertMessage.email,
      subject: insertMessage.subject,
      message: insertMessage.message,
      createdAt,
      phone: insertMessage.phone ?? null
    };
    
    this.contactMessages.set(id, message);
    return message;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();
