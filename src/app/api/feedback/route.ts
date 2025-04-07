type Feedback = {
    id: number;
    name: string;
    email: string;
    message: string;
  };
  
  let feedbacks: Feedback[] = [];
  
  export async function POST(req: Request) {
    const body = await req.json();
    const { name, email, message } = body;
  
    const newFeedback: Feedback = {
      id: Date.now(),
      name,
      email,
      message,
    };
  
    feedbacks.push(newFeedback);
  
    return new Response(JSON.stringify({ message: 'Feedback submitted' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  export async function GET() {
    return new Response(JSON.stringify(feedbacks), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  