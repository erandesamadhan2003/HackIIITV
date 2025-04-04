import { Button } from '@/components/ui/button.jsx';
import {ColourfulTextDemo} from  '../components/test.jsx';
export const JoinRoom = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <ColourfulTextDemo/>
            <Button className="z-50 relative">Join Room </Button>

            

            {/* <colourful-text/> */}
        </div>
    )
}
