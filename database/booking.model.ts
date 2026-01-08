import mongoose, { Document, Schema, Model, Types } from 'mongoose';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          // RFC 5322 simplified email validation regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Pre-save hook to verify that the referenced event exists
BookingSchema.pre('save', async function (next) {
  // Only validate eventId if it's new or modified
  if (this.isModified('eventId')) {
    try {
      // Dynamically import Event model to avoid circular dependencies
      const Event = mongoose.models.Event || (await import('./event.model')).default;
      
      const eventExists = await Event.exists({ _id: this.eventId });
      
      if (!eventExists) {
        // @ts-ignore
        return next(new Error('Referenced event does not exist'));
      }
    } catch (error) {
      // @ts-ignore
      return next(error as Error);
    }
  }
  
  // @ts-ignore
  next();
});

// Add index on eventId for faster queries
BookingSchema.index({ eventId: 1 });

// Create and export the Booking model
// Use existing model if it exists to prevent OverwriteModelError in development
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
