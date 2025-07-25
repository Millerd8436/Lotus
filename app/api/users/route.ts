import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function POST() {
  try {
    const newUser = await prisma.user.create({
      data: {},
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
} 