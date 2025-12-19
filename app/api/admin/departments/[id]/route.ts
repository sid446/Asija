import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Department from '@/models/Department';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;
    const body = await request.json();
    const { name, description, icon, order } = body;

    const department = await Department.findByIdAndUpdate(
      id,
      { name, description, icon, order },
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    // Check if department is being used by any policies
    const Policy = (await import('@/models/Policy')).default;
    const policiesUsingDept = await Policy.find({ subCategory: id });

    if (policiesUsingDept.length > 0) {
      return NextResponse.json({
        error: 'Cannot delete department that is being used by policies'
      }, { status: 400 });
    }

    const department = await Department.findByIdAndDelete(id);

    if (!department) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error);
    return NextResponse.json({ error: 'Failed to delete department' }, { status: 500 });
  }
}