# :hospital: MedMe

This app is the work of 4 developers: 
* <strong>[Dirk Wiggins](https://github.com/kridlet)</strong>
* <strong>[Matt McCarthy](https://github.com/mccartmz)</strong>
* <strong>[Joe McCreesh](https://github.com/jmccreesh)</strong>
* <strong>[Matthew Wright](https://github.com/Mjohnwright)</strong>

### Link to App
* <strong>[MedMe](https://kridlet.github.io/MedMe/)</strong>

### Screenshot
![Full Size](https://github.com/kridlet/MedMe/blob/master/assets/images/medme.png)

### Application Concept:
Taking medications is serious business.  It is critical to take prescribed medicine regularly and on time.  If the wrong dose is taken, or the recommended dose is taken at the wrong time; health problems and adverse reactions can result.  This problem can further compound itself when taking multiple medications.  

Matt McCarthy works with Seniors teaching them computer skills.  He sees firsthand the frustration and complexity that population has with managing their medications.  

MedMe was developed to address this problem.  The best part, it's free!

Users can search for their medication, enter their prescribed dosage amount, and the frequency they take their meds into our secure database.  Not sure of the name of the drug?  No sweat, our exhaustive database includes all FDA approved medications to help you find your exact prescription.  In addition, we list the standard dosage amounts.  

Once a user creates a profile, they can store and manage all their medication information in one place.  MedMe sends you a text alert when it is time to take you meds.  If your prescription ever changes you can go into your account information page and update your information.

When using MedMe you can be confident you are doing exactly what your doctor wants you to do.  MedMe is committed to help you live an active and healthy life, because if you are dead, you are no longer useful to us.

### Design Process:
We began the process by brainstorming ideas for an app.  We ended with 3 or 4 ideas.  We chose MedMe because of its’ practicality and purposefulness.  

Our first attempt at designing this application focused on how we would lure a user into finding out more about our service.  We posed a question about any of the drugs they are taking to lead them to a page where we could provide more information about other drugs they may also take.  Then we determined if we could ask the user when they take their meds, we could create an alert system to send a text message at the appointed time.
 
Next, we kicked around ideas about site functionality. We thought about what we would like the app to do, and if we could code it.  Once we determined what was feasible, we drew up the different pages on a whiteboard and created a flowchart.

With the rough design sketched out, we divided the labor.  The coding challenges we determined were design and functionality.  Design was straightforward using bootstrap.  It took some tweaking to get the bootstrap layout to match our needs and function.  Coming up with a logo, font and color scheme that popped and looked clean was a challenge.

The functionality trials were centered around API calls, Firebase and Twilio.  It seemed that every step along the process functional code creation was frustrating, but terrific learning experiences. It was even more challenging to harmoniously tie the individual pieces and pages together.  For example, using a Google Map to locate pharmacies in the area relied up pulling the user’s address information from Firebase.  It is one thing to use a submit form from a page to automatically load the Google API search query, it is another to store the information, and pull it out again from the database.  

Another example, is storing all the user data and putting that data on a separate file to create a clean html table that presents all the information.  It seemed that many fixes put in place created fresh problems to solve.  We are certain not all the bugs are fixed.  We are not even sure if we know what all the bugs are.  Building an app with multiple technologies and functions presents many testing difficulties.

Perhaps the most challenging part was coordinating everyone’s individual contributions into GitHub.  Everyone’s work was too closely linked together to make clean merge and pull requests.  If we had to do it all over again, we may just skip GitHub until the end and share work through file exchanges using Slack.  All in all, we worked well together, and everyone was committed to making it work, and worked their tails off pursuant to that goal.

### Technologies:

*	Bootstrap
*	Google Map API
*	NIH (National Institute for Health) API for the drug Interactions and auto-completer
*	Federal Drug Administration (FDA) API for drug side effects
*	Firebase for data storage and authentication
*	Twilio for reminder text messages

### Direction for Future Development:

*	Continue to debug existing code.  This includes code comments.  Currently our html, css and js are jumbled about.
*	Create an information share forum so people can connect with others who are taking the same medications.
*	Include a health blog with regular contributions from thought leaders in the field of pharmacology.
*	Create a delivery service for prescriptions.
*	Compare pharmacy prices and allow users to rate pharmacies and leave written reviews.




