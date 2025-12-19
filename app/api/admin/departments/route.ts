import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Department from '@/models/Department';

export async function GET() {
  try {
    await connectToDatabase();

    const departments = await Department.find({}).sort({ order: 1 });

    return NextResponse.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { slug, name, description, icon, order } = body;

    // Check if slug already exists
    const existingDept = await Department.findOne({ slug });
    if (existingDept) {
      return NextResponse.json({ error: 'Department with this slug already exists' }, { status: 400 });
    }

    const department = new Department({
      slug,
      name,
      description,
      icon,
      order
    });

    await department.save();

    return NextResponse.json(department, { status: 201 });
  } catch (error) {
    console.error('Error creating department:', error);
    return NextResponse.json({ error: 'Failed to create department' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { id, slug, name, description, icon, order } = body;

    const department = await Department.findByIdAndUpdate(
      id,
      { slug, name, description, icon, order },
      { new: true }
    );

    if (!department) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    return NextResponse.json(department);
  } catch (error) {
    console.error('Error updating department:', error);
    return NextResponse.json({ error: 'Failed to update department' }, { status: 500 });
  }
}