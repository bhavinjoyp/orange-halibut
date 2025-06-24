import { NextRequest, NextResponse } from 'next/server';
import { wixService } from '@/lib/wix';

type RouteContext = {
  params: {
    id: string;
  };
};

// Fetch single gallery item
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = context.params;
    const result = await wixService.getGalleryItems();
    if (!result.success || !result.data) {
      return NextResponse.json({ success: false, error: result.error || 'No data found' }, { status: 500 });
    }
    const item = result.data.find((g: any) => g.id === id);
    if (!item) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Gallery fetch single error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch gallery item' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const galleryData = await request.json();
    const { id } = context.params;
    
    const result = await wixService.updateGalleryItem(id, galleryData);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data
    });
  } catch (error) {
    console.error('Gallery update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update gallery item' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = context.params;
    
    const result = await wixService.deleteGalleryItem(id);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    console.error('Gallery deletion error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete gallery item' },
      { status: 500 }
    );
  }
}
