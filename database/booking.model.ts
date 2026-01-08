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

// Compound unique index to ensure one booking per email per event
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

// NOTE: Event existence validation should be performed at the application/service
// layer before calling booking.save() to avoid unnecessary DB hits on every save.
// Example: await Event.findById(eventId) or Event.exists({ _id: eventId })
  // @ts-ignore
  next();
});

// Create and export the Booking model
// Use existing model if it exists to prevent OverwriteModelError in development
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
