import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter required' }, { status: 400 })
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsAggregator/1.0)',
      },
    })
    const html = await response.text()

    // Extract og:image from HTML
    const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/)
    const imageUrl = ogImageMatch ? ogImageMatch[1] : null

    if (!imageUrl) {
      return NextResponse.json({ error: 'No og:image found' }, { status: 404 })
    }

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error('Error fetching OG image:', error)
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 })
  }
}
