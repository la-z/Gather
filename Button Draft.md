Buttons:

    Nav Menu:

        New Event: will render the event creation page
        GET to '/newEvent'

            Party Time Submit - will store the event in the database
            POST to '/newEvent'

        My Events: will render the user's *dashboard*
        GET to '/myEvents'

            Events Made(List Items) - will need to query the database for events owned by user

                :MapPage: - when a user clicks on an event
                GET to '/event'

        Login/Signup: -
        Submit: 
            POST to '/login' if this return negative
                POST to '/signup'
            else...create a session? GET /user...?
            

    
    Categories:
        GET to '/category'

        Outdoor '/category?query=Outdoor' OR '/category?category=Outdoor' 

        TableTops '/category?query=TableTops' OR '/category?category=TableTops'

        Music '/category?query=Music' OR '/category?category=Music'
    
    List Items....    
        <!-- Every list item will be handled by the same route
            The details will be stored in the URI and dealt with by the request handler -->
    GET to '/event'

    
    
