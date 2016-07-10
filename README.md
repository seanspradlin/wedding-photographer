# Wedding Photographer

I am building this app to be used during my upcoming wedding for guests to take
pictures and submit them to be viewed and ranked. The user experience is going to
go something along the lines of:

1. Each guest will receive a card with a short pass phrase and the application url.
2. Guest will go to the url on their mobile device and enter the pass phrase to register.
3. During the registration, they can associate to Google/Facebook to auto populate their
   name and contact info. We will store a cookie in the browser to persist their session.
4. The default screen will display a grid of submitted photos. Tapping on a picture will
   enlarge it, which will display a toggleable +1 voting button so users can cast or
   rescing their vote. There will also be a previous/next/autoplay button to cycle through
   images. Votes will be tracked on a per-account basis.
5. At the bottom, there will be a button to upload a photo, which will bring up their
   device's camera/library, and a button to view their submissions to be edited or deleted.
