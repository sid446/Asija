import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Team from '@/models/Team';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    
    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );

    if (!updatedTeam) {
      return NextResponse.json({ message: 'Team member not found' }, { status: 404 });
    }

    return NextResponse.json({ team: updatedTeam });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ message: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const deletedTeam = await Team.findByIdAndDelete(id);

    if (!deletedTeam) {
      return NextResponse.json({ message: 'Team member not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ message: 'Failed to delete team member' }, { status: 500 });
  }
}
