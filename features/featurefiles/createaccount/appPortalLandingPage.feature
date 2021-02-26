Feature: Validate Landing Page of the CAS Applicant Portal

    Background: Start The browser
        Given add custom tile
        |tile|
        |Essays|
        Given delete custom tile
        |tile|
        |Essays|
        Given i print text
        |text|
        |anisha|
        |shetty|
       #Given i execute query with return
       #|Value|
       #|SELECT_BUCOM_PROGRAMS|
       #Given i execute query without return
       #|Value|
       #|ACTIVATE_BUCOM_PROGRAMS|
       

    Scenario Outline: Create Account
       And Open the 'aacomas' Applicant page '<device>'
        Given Create Account button is clicked
        When User Account is created
        Then Select an program in Add Program page and continue to DashBoard
        Then Validate DashBoard Page and print CASID
        Then Select quadrant "1"
        Then Select tile "Biographic Information"
       Then Complete "Biographic Information" tile
       Then The browser is closed
          Examples:
              |device          |
              |desktop-chrome  |
            #  |desktop-firefox |
            #  |mobile          |
            #  |tablet          |

   #Scenario Outline: Launch Applicant Portal And  Login
    #    And Open the 'BuCom' Applicant page '<device>'
     #   Given UserName and Password is provided
      #  When SignIn button is clicked
       # Then Validate DashBoard Page and print CASID
        #And SignOut from App Portal
        #Then The browser is closed
        #Examples:
         #    |device   |
          #   |desktop  |
           #  |mobile   |
            # |tablet   |