/*
===================
1. Structuring with bootstrap classes
2. Global Changes
3. Job Board Design
4. Plugin calls
5. Supporting function
6. Click Methods & related function calls
7. Rss Feed
8. System pages changes
 8.1. News page changes
*/

!(function($) {
    // RSS feed publish date format
    function formatDate(pubDate) {
        var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        //var dateObj = new Date(Date.parse(pubDate));
        var dateObj = pubDate.split('/'),
            mnth = monthList[parseInt(dateObj[1]) - 1],
            myDay = "<span class='rss-item-pubDate-date'>" + dateObj[0] + "</span> ",
            myMonth = "<span class='rss-item-pubDate-month'>" + dateObj[1] + "</span> ",
            myYear = "<span class='rss-item-pubDate-full-year'>" + dateObj[2] + "</span> ";
        return myMonth + myDay + "," + myYear;
    }
    // jquery
    $(function() {
        // 1. Structuring with bootstrap classes
        // ========================================
        // Section > Div.container
        $('#dynamic-container, #content-container, #job-dynamic-container').addClass('container');
        // Content column
        // if ($.trim($('#dynamic-side-left-container, #side-left, #job-side-column').html()).length) {
        //     if($('#miniAdvertiserLoggedIn').length){
        //         $('#job-dynamic-container #content').addClass('col-sm-8 col-md-9');
        //         $('#job-side-column').addClass('col-sm-4 col-md-3 hidden-xs');
        //     }
        //     $('#dynamic-content, #content-container #content').addClass('col-sm-8 col-md-9');
        //     $('#dynamic-side-left-container, #side-left').addClass('col-sm-4 col-md-3 hidden-xs');
        // } else {
        //     $('#dynamic-content, #content-container #content').addClass('col-xs-12');
        //     $('#dynamic-side-left-container, #side-left').addClass("hidden");
        // }

        if (!$.trim($('#dynamic-side-left-container, #side-left, #job-side-column').html()).length) {
            $('#dynamic-content, #content-container #content').addClass('col-xs-12');
            $('#dynamic-side-left-container, #side-left').addClass("hidden");
        } else {
            if($('#miniAdvertiserLoggedIn').length){
                $('#job-dynamic-container #content').addClass('col-sm-8 col-md-9');
                $('#job-side-column').addClass('col-sm-4 col-md-3 hidden-xs');
            }
            $('#dynamic-content, #content-container #content').addClass('col-md-9');
            $('#dynamic-side-left-container').addClass('col-sm-4 col-md-3 hidden-xs hidden-sm');
            $('#side-left').addClass('col-sm-4 col-md-3 hidden-xs hidden-sm');
        }
        
        //right navigation
        if (!$.trim($('#dynamic-side-right-container, #side-right').html()).length) {
            $('#dynamic-content, #content-container #content').addClass('col-xs-12');
            $('#dynamic-side-right-container, #side-right').addClass("hidden");
        } else {
            $('#dynamic-side-right-container, #side-right').addClass('col-sm-3 hidden-sm hidden-xs');
            $('#dynamic-content, #content-container #content').addClass('col-md-9 col-xs-12');
            // if( $('body [action="advancedsearch.aspx"], body [action="createjobalert.aspx"] ').length  ){
            //     $('#dynamic-content, #content-container #content').addClass('col-md-6 col-sm-9 col-xs-12');
            // }else{
            //     $('#dynamic-content, #content-container #content').addClass('col-md-9 col-sm-9 col-xs-12');
            // }
        }
        
        //left & right navigation
        if (!$.trim($('#dynamic-side-left-container, #side-left').html()).length && !$.trim($('#dynamic-side-right-container, #side-right').html()).length) {
            $('#dynamic-content, #content-container #content').addClass('col-xs-12');
        } else if( !$.trim($('#dynamic-side-left-container, #side-left').html()).length && $.trim($('#dynamic-side-right-container, #side-right').html()).length ) {
            $('body').addClass('template-2col-right-sidebar');
        } else {
            $('#dynamic-side-right-container, #side-right').addClass('col-sm-3 hidden-sm hidden-xs');
            $('#dynamic-content').addClass('col-xs-12');
        }

        if(!$.trim($('#related-links').html()).length){
            $('#dynamic-side-right-container').css('visibility', 'hidden');
        }
        $('#job-dynamic-container #content').addClass('col-xs-12');
        // form elements style
        $('input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=reset]):not([type=file]):not([type=image]):not([type=date]), select, textarea').addClass('form-control');
        $('input[type=text]').addClass('form-control');
        $('input[type=submit]').addClass('btn btn-primary');
        $('.mini-new-buttons').addClass('btn btn-primary');
        $('input[type=reset]').addClass('btn btn-default');
        // Responsive table
        $('.dynamic-content-holder table, .content-holder table').addClass('table table-bordered').wrap('<div class="table-responsive"></div>');
        // Convert top menu to Boostrap Responsive menu
        $('.navbar .navbar-collapse > ul').addClass('nav navbar-nav');
        $('.navbar .navbar-collapse > ul > li').has('ul').addClass('dropdown');
        $('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
        $('.navbar .navbar-collapse > ul > li.dropdown').append('<a id="child-menu"></a>');
        $('.navbar .navbar-collapse > ul > li.dropdown > a#child-menu').append('<b class="caret"></b>').attr('data-toggle', 'dropdown').addClass('dropdown-toggle');
        $('.navbar .navbar-collapse > ul > li > ul').addClass('dropdown-menu');
        // add placeholder for search widget text field
        $('#keywords1').attr('placeholder', 'Keywords search');
        // 2. Global Changes
        // ========================================
        // Adding a aria-label for accessabilty (Temp fix ONLY)
        $('#keywords1').attr('aria-label', 'Keyword search box');
        $('#professionID1').attr('aria-label', 'Professions');
        $('#locationID1').attr('aria-label', 'Locations');
        $('link[href*="/media/COMMON/newdash/lib/bootstrap.min.css"]').remove();
        var currentPage = window.location.pathname.toLowerCase();
        // remove empty li's on the system pages.
        $("#side-left li:empty").remove();
        // remove empty left side bar
        if ($('#prefix_left-navigation').children().length == 0) {
            $('#prefix_left-navigation').remove();
        }
        if ($('#side-left').children().length == 0) {
            $('#side-left').remove();
        }



        // add active class to links.
        $("li a[href='" + window.location.pathname.toLowerCase() + "']").parent().addClass("active");
        $("li.active li.active").parent().closest("li.active").removeClass("active");
        $("li li.active").parent().parent().addClass("active");
            // add last-child class to navigation
        $("#prefix_navigation > ul > li:last").addClass("last-child");
        // add btn style
        $(".backtoresults a").addClass("btn btn-default");
        $(".apply-now-link a").addClass("btn btn-primary");
        $(".button a").addClass("btn btn-default");
        //.left-hidden show
        if ((document.URL.indexOf("/advancedsearch.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }
        if ((document.URL.indexOf("/advancedsearch.aspx?") >= 0)) {
            $(".left-hidden").css("display", "none");
        }
        if ((document.URL.indexOf("/member/createjobalert.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }
        if ((document.URL.indexOf("/member/login.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
            $("input#btnLogin").val("Login");
            $('li.memberlogin-links a.memberlogin-register').text('Don’t have an account? Create one here');
        }
        if ((document.URL.indexOf("/news.aspx?category=graduate-blog") >= 0)){
            $('ul.dropdown-menu li a[href="/news.aspx?category=graduate-blog"]').parent().addClass('active');
            $('li.dropdown a[href="/graduates"]').parent().addClass('active');
        }
        if ((document.URL.indexOf("/news.aspx?category=employer-blog") >= 0)){
            $('ul.dropdown-menu li a[href="/news.aspx?category=employer-blog"]').parent().addClass('active');
            $('li.dropdown a[href="/employers"]').parent().addClass('active');
        }
        if ((document.URL.indexOf("/news.aspx?sortby=latest&categories=1519,1520,1521") >= 0)){
            $('ul.dropdown-menu li a[href="/news.aspx?sortby=latest&categories=1519,1520,1521"]').parent().addClass('active');
            $('li.dropdown a[href="/about-us"]').parent().addClass('active');
        }
        // Contact - Google map
        $("#footer").prepend($("#contact-map"));
        // generate select navigation from sidebar Dynamic menu
        $("#dynamic-content").convertNavigation({
            title: "Related Pages",
            links: "#site-topnav .navbar-nav li.active a:not([data-toggle=dropdown])"
        });
        // generate actions button on Job Listing page
        $(".job-navbtns").convertButtons({
            buttonTitle: "Actions&hellip;",
            title: "Please choose&hellip;",
            links: ".job-navbtns a"
        });
        // generate filters button on Job Listing page
        $(".job-navbtns").convertFilters({
            buttonTitle: "Filters&hellip;",
            filteredTitle: "Applied Filters",
            title: "Please choose&hellip;",
            filtered: ".search-query p",
            list: "ul#side-drop-menu",
            excludeFromList: "#AdvancedSearchFilter_PnlCompany"
        });
        /* System Page Forms */
        if (currentPage == "/member/createjobalert.aspx") {
            setTimeout('__doPostBack(\'ctl00$ContentPlaceHolder1$ucJobAlert1$ddlProfession\',\'\')', 0);
            Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function() {
                $('.alternate > li > select, #ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryLowerBand, #ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryUpperBand').addClass('form-control');
                $('#ctl00_ContentPlaceHolder1_ucJobAlert1_ddlProfession, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlRole, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlLocation, #ctl00_ContentPlaceHolder1_ucJobAlert1_lstBoxArea, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlSalary').addClass('form-control');
            });
        }
        $(document).ajaxComplete(function() {
            $('#divRoleID1 > select, #divAreaDropDown1 > div > select').addClass('form-control');
            $('#divRoleID > select, #divAreaDropDown > div > select').addClass('form-control');
        });
        $('#salaryID').change(function() {
            $(document).ajaxComplete(function() {
                $('#divSalaryFrom > input').addClass('form-control');
                $('#divSalaryTo > input').addClass('form-control');
            });
        });

        function SalaryFromChange1() {
            $(document).ajaxComplete(function() {
                $('#divSalaryTo1 > input').addClass('form-control');
                $('#divSalaryFrom1 > input').addClass('form-control');
            });
        }
        if (currentPage == "/member/register.aspx") {
            $(".uniForm").addClass("border-container");
            $('label[for*="docInput"]').html('Upload CV <span class="form-required">*</span>');
            $('#ctl00_ContentPlaceHolder1_docInput').parent().insertAfter($('#ctl00_ContentPlaceHolder1_txtConfirmEmail').parent());

            $("#btnSubmit").on('click', function(e){
                if ( $('#ctl00_ContentPlaceHolder1_docInput').val().length === 0){
                    e.preventDefault();
                    $('#ctl00_ContentPlaceHolder1_cvalDocument').text('Please upload your CV.').show();
                }else{
                    $('#ctl00_ContentPlaceHolder1_cvalDocument').hide();
                }
            });

            // $('.MemberFullRegisterHeader').hide();
            // $('#ctl00_ContentPlaceHolder1_pnlFullRegistration').show();
        }
        if (currentPage == "/member/createjobalert.aspx") {
            $(".uniForm").addClass("border-container");
        }
    });
    // Resize action
    /*$(window).on('resize', function() {

        var wi = $(this).width();

        // Mobile & Tablet
        if ( wi <= 992 ) {
            //$('#dynamic-side-left-container').before($('#dynamic-content'));
            //$('#side-left').before($('#content'));
            $('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');
        }
        //  Desktop
        else {
            //$('#dynamic-side-left-container').after($('#dynamic-content'));
            //$('#side-left').after($('#content'));
            $('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
        }

    });*/
    $(document).ready(function() {
        //hide Salary
        //$(".jxt-result-salary").text(" ");
        $(".jxt-result-salary").addClass("salary");
        $(".currency-symbol").remove();
        
        
        if(window.location.pathname.indexOf("/news.aspx") > -1){
            $(".jxt-news-container h1").text('Give A Grad A Go Blog');
        }



     //radio button show/hide
         //$('input[value$="resume2"]').click(function(){


      //  $('#rbUploadResume').click(function(){
        //$('#secUploadResume').hide();
        //$('#secExistingResume').show();
        //});




        /*// Resize action
        var $window = $(window);
            // Function to handle changes to style classes based on window width
            function checkWidth() {
            if ($window.width() < 992) {
                $('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');
                }
        }
            // Execute on load
            checkWidth();
            // Bind event listener
            $(window).resize(checkWidth);*/
        //Memeber profile
        if( window.location.pathname == '/member/profile.aspx' ){
            CustomFunction('member/profile.aspx');

            $('.inner-banner .row').append($('h1').first().html('<span>Your Profile</span>'));

            $('.content-holder').prepend( '<div class="col-xs-12"><p>It’s our aim to guide you through the graduate jobs market. To learn more about your career objectives and the types of jobs that you will be suitable for, you need to complete the below profile. We will then be able to quickly match you to the roles that fit your background and experience.</p></div>' );

        }
        // 4. Plugin calls
        // ========================================
        // Home services - carousel
        $('.t-gallery').Gallerycarousel({
            autoRotate: 4000,
            visible: 4,
            speed: 1200,
            easing: 'easeOutExpo',
            itemMinWidth: 250,
            itemMargin: 30
        })
        $("#home-courasal").owlCarousel({
            loop: true,
            autoplay: true,
            nav: false,
            autoplaySpeed: 1200,
            responsive: {

                0: {
                    items: 1,
                    margin: 0
                }

            }

        })

        // Search Widget
        $('.search-widget select#professionID1 option[value="-1"]').text('All Industries');
        $('.search-widget select#locationID1 option[value="-1"]').text('All Locations');

        $('.inner-search input#keywords1').attr('placeholder', 'e.g Marketing Assistant');

        // Job template
        if($('.job-ad-mini').length){
            $('#wrapper').addClass('job-ad');
        }

        // Apply borady changes
        $('.boardy-resume-options h3').text('CV');
        var resumeText = $('input#rbUploadResume');
        $('#cvUploadResume label').html('Upload a CV').prepend(resumeText);
        $('#secExistingResume > .form-group > label').text('Upload CV');
        if( $('#resultsList').children().length < 1 ){ //no job found case
            $('#resultsList').html('<div class="not-found-message text-center"><h3>No results to display</h3><p>Try searching different criteria. Or keep up to date with opportunities by signing up to our jobs listing newsletter.</p><a href="/member/register.aspx" class="btn btn-primary">Sign up</a> </div>');
        }
        // Equal Height
        $.fn.eqHeights = function(options) {
            var defaults = {
                child: false
            };
            var options = $.extend(defaults, options);
            var el = $(this);
            if (el.length > 0 && !el.data('eqHeights')) {
                $(window).bind('resize.eqHeights', function() {
                    el.eqHeights();
                });
                el.data('eqHeights', true);
            }
            if (options.child && options.child.length > 0) {
                var elmtns = $(options.child, this);
            } else {
                var elmtns = $(this).children();
            }
            var prevTop = 0;
            var max_height = 0;
            var elements = [];
            elmtns.height('auto').each(function() {
                var thisTop = this.offsetTop;
                if (prevTop > 0 && prevTop != thisTop) {
                    $(elements).height(max_height);
                    max_height = $(this).height();
                    elements = [];
                }
                max_height = Math.max(max_height, $(this).height());
                prevTop = this.offsetTop;
                elements.push(this);
            });
            $(elements).height(max_height);
        };
        // Equal Height - Usage
        $('.service-holder').eqHeights();
        // 5. Supporting function
        // ========================================
        // if there is a hash, scroll down to it. Sticky header covers up top of content.
        if( window.location.hash.indexOf('=') < 0 && window.location.hash.indexOf('!') < 0 ){
            if ($(window.location.hash).length) {
                $("html, body").animate({
                    scrollTop: $(window.location.hash).offset().top - $(".navbar-wrapper").height() - 40
                }, 100);
            }    
        }
        
        // 6. Click Methods & related function calls
        // ========================================
        // contact page stop scrolling until clicked.
        $(".r27_map-overlay").click(function() {
            $(this).hide();
        });
        // 7. Rss Feed
        // ========================================
        //consulant feed : meet the team page
        if ($('#r17_team-member-pages').length) {
            $(".r17_team-member-page").each(function() {
                var dataURL = $(this).attr("data-url");
                $(this).includeFeed({
                    baseSettings: {
                        rssURL: [dataURL || "/ConsultantsRSS.aspx"],
                        limit: 200,
                        addNBSP: false,
                        repeatTag: "consultant"
                    }, //end of base setting
                    templates: {
                        itemTemplate: '<li class="team-section"><figure><a href="/t/{{FriendlyURL}}" title="{{FirstName}} {{LastName}}"><img src="{{ImageURL}}" alt="{{FirstName}} {{LastName}}"><div class="figcaption"><h3>{{FirstName}} {{LastName}}</h3><p>{{PositionTitle}}</p></div></a></figure></li>'
                    }, //end of templates
                    complete: function() {
                            $('#r17_team-member-pages').checkImagesLoaded(equalhight2);
                            // equalhight2();
                        } // end of complete function
                }); // end of include feed
            }); // end of team list each
        }
        if ($('#r17_team-member-testimonials').length) {
            $(".r17_team-member-testimonial").each(function() {
                var dataURL = $(this).attr("data-url");
                $(this).includeFeed({
                    baseSettings: {
                        rssURL: [dataURL || "/ConsultantsRSS.aspx"],
                        limit: 200,
                        addNBSP: false,
                        repeatTag: "consultant"
                    }, //end of base setting
                    templates: {
                        itemTemplate: '<li class="inner-testimonial"><div class="testimonial-img"><img src="{{ImageURL}}" alt="{{FirstName}} {{LastName}}"></div><div class="testimonial-content"><h1>{{FirstName}}<span class="testimonial-title">{{PositionTitle}}</span></h1><p>{{ShortDescription}}</p><div class="read-more"><a href="/t/{{FriendlyURL}}"><i class="fa fa-chevron-right"></i></a></div></div></li>'
                    }, //end of templates
                    complete: function() {} // end of complete function
                }); // end of include feed
            }); // end of team list each
        }
        /*$(window).resize(function() {
            equalhight();
        });
        $(window).load(function() {
            equalhight();
        });*/



        // Latest Jobs widget
        $(".homepage-job #myJobsList").includeFeed({
            baseSettings: {
                rssURL: "/job/rss.aspx?search=1&addlocation=1", addNBSP: false
            },
            templates: {
                itemTemplate: "<div class='job-box'><h4><a href='{{link}}'>{{title}}</a></h4><div class='desc'>{{description}}</div></div>"
            },
            /*elements: { title: 1, description: 1 },*/
            predicates: {
                pubDate: formatDate
            },
            complete: function() {
              
                $(this).children().each(function() {
                    var item = $(this);
                    item.find('.xmlLocation').insertAfter($(this).find('h4'));
                    var itemTitle = $(this).find('h4 a').text();
                    var itemTitleLen = $(this).find('h4 a').text().length;
                    if( itemTitleLen > 35 ){
                        itemTitle = itemTitle.substr(0,34) +'...';
                    }
                    if(itemTitle.indexOf('-') > -1){
                        var temTitle = itemTitle.split('-');
                        itemTitle = temTitle[0]+'<br>-'+temTitle[1];
                    }
                    $(this).find('h4 a').html(itemTitle);
                });
                if ($(this).children().length > 3) {
                    $(this).owlCarousel({
                        loop: true,
                        autoplay: true,
                        navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
                        nav: true,
                        responsive: {
                            0: {
                                items: 1,
                                margin: 0
                            },
                            640: {
                                items: 2,
                                margin: 15
                            },
                            768: {
                                items: 2,
                                margin: 15
                            },
                            992: {
                                items: 3,
                                margin: 15
                            },
                            1200: {
                                items: 3,
                                margin: 15
                            }
                        }
                    })
                }
                 
            }
        });

        //consultant job feed
        var dataKeyword = $(".consultant-job #myJobsList").data('url');
        /*if( dataKeyword!= undefined && dataKeyword!='' && dataKeyword.trim()=="Georgia" ){
            dataKeyword = "/job/rss.aspx?search=1&addlocation=1&keywords=" + dataKeyword; 
            $(".section-jobfeed").removeClass('hidden');*/
            $(".consultant-job #myJobsList").includeFeed({
                baseSettings: {
                    rssURL: dataKeyword, addNBSP: false
                },
                templates: {
                    itemTemplate: "<div class='job-box'><h4><a href='{{link}}'>{{title}}</a></h4><div class='desc'>{{description}}</div></div>"
                },
                /*elements: { title: 1, description: 1 },*/
                predicates: {
                    pubDate: formatDate
                },
                complete: function() {
                    $(this).children().each(function() {
                        var item = $(this);
                        item.find('.xmlLocation').insertAfter($(this).find('h4'));
                        var itemTitle = $(this).find('h4').children().text();
                        var itemTitleLen = $(this).find('h4').children().text().length;
                        if( itemTitleLen > 35 ){
                            itemTitle = itemTitle.substr(0,34) +'...';
                        }
                        $(this).find('h4').children().text(itemTitle);
                    });
                    if ($(this).children().length < 1) {
                        $('.section-jobfeed').hide();
                    }
                    if ($(this).children().length > 5) {
                        $(this).owlCarousel({
                            loop: true,
                            autoplay: true,
                            navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
                            nav: true,
                            responsive: {
                                0: {
                                    items: 1,
                                    margin: 0
                                },
                                640: {
                                    items: 2,
                                    margin: 15
                                },
                                768: {
                                    items: 2,
                                    margin: 15
                                },
                                992: {
                                    items: 3,
                                    margin: 15
                                },
                                1200: {
                                    items: 5,
                                    margin: 15
                                }
                            }
                        })
                    }
                }
            });
        /*}*/


        $(".inner-joblist #myJobsList").each(function(){
        var jobURL = [$(this).attr("data-url") || "/job/rss.aspx?search=1&addlocation=1&addprofession=1"];
        //innerpage job
        $(".inner-joblist #myJobsList").includeFeed({
            baseSettings: {
                rssURL: jobURL,
                addNBSP: false,
                limit: 10
            },
            templates: {
                itemTemplate: "<div class='job-holder'>\n\
                    <div class='job-toplink'>\n\
                        <a href={{link}}>{{title}}</a></div>\n\
                    <div class='description-holder'>\n\
                        <div class='description-text'>{{description}}</div>\n\
                    </div>\n\
                    <div class='locandsalary'>\n\
                        <div class='labels-wrapper'><span class='labels location-label'>Location</span><span class='jxt-result-loc'><!-- --></span></div>\n\
                        <div class='labels-wrapper'><span class='labels worktype-label'>Contract</span><span class='jxt-result-worktype'><!-- --></span></div>\n\
                    </div>\n\
                </div>"
            },
            /*elements: { title: 1, description: 1 },*/
                predicates: {
                // example predicate use
                pubDate: function(pubDate){
                    return pubDate;
                }
            },
            complete: function() {
                // $(this).children().each(function() {
                //     var item = $(this);
                //     item.find('.rssLocation').append(item.find('.xmlLocation').html());
                // });
                $(this).children().each(function() {
                    var item = $(this);
                    $(this).find('.jxt-result-loc').append(item.find('.xmlLocation .xmlBoldTitle strong').text());
                    $(this).find('.jxt-result-worktype').append(item.find('.xmlWorktype .xmlBoldTitle strong').text());
                    // $(this).find('.job-breadcrumbs a').append(item.find('.xmlProfession .xmlBoldTitle strong').text());
                    // $(this).find('.job-breadcrumbs a').attr('href', '/advancedsearch.aspx?search=1' + item.find('.xmlProfession .xmlBoldTitle strong').text());
                });
                if ($(this).children().length){ 
                    $(this).children().each(function(){
                        var desc = $(this).find('.description-text').text();
                        var descLen = $(this).find('.description-text').text().length;
                        if( descLen > 151 ){
                            desc = desc.substr(0,150) +'...';
                        }
                        $(this).find('.description-text').text(desc);
                    });
                }
            }
        });
        });


        //multiple roles
        if( $("#myJobsList-roles").length ){
        
            var rssSales = [
                "/job/rss.aspx?search=1&professionid=4056&roleids=51694",
                "/job/rss.aspx?search=1&professionid=4057&roleids=51716",
                "/job/rss.aspx?search=1&professionid=4058&roleids=51738",
                "/job/rss.aspx?search=1&professionid=4059&roleids=51760",
                "/job/rss.aspx?search=1&professionid=4060&roleids=51782",
                "/job/rss.aspx?search=1&professionid=4061&roleids=51804",
                "/job/rss.aspx?search=1&professionid=4062&roleids=51826",
                "/job/rss.aspx?search=1&professionid=4063&roleids=51848",
                "/job/rss.aspx?search=1&professionid=4064&roleids=51870",
                "/job/rss.aspx?search=1&professionid=4065&roleids=51892",
                "/job/rss.aspx?search=1&professionid=4066&roleids=51914",
                "/job/rss.aspx?search=1&professionid=4067&roleids=51936"
            ];
            //innerpage job
            for( var i=0; i<rssSales.length; i++ ){
                $("#myJobsList-roles").includeFeed({
                    baseSettings: {
                        rssURL: rssSales[i],
                        addNBSP: false,
                        limit: 10
                    },
                    templates: {
                        itemTemplate: "<div class='job-holder'>\n\
                            <div class='job-toplink'>\n\
                                <a href={{link}}>{{title}}</a></div>\n\
                            <div class='description-holder'>\n\
                                <div class='description-text'>{{description}}</div>\n\
                            </div>\n\
                            <div class='locandsalary'>\n\
                                <div class='labels-wrapper'><span class='labels location-label'>Location</span><span class='jxt-result-loc'><!-- --></span></div>\n\
                                <div class='labels-wrapper'><span class='labels worktype-label'>Contract</span><span class='jxt-result-worktype'><!-- --></span></div>\n\
                            </div>\n\
                        </div>"
                    },
                    predicates: {
                        // example predicate use
                        pubDate: function(pubDate){
                            return pubDate;
                        }
                    },
                    complete: function() {
                    
                        $(this).children().each(function() {
                            var item = $(this);
                            $(this).find('.jxt-result-loc').append(item.find('.xmlLocation .xmlBoldTitle strong').text());
                            $(this).find('.jxt-result-worktype').append(item.find('.xmlWorktype .xmlBoldTitle strong').text());
                        });
                        if ($(this).children().length){ 
                            $(this).children().each(function(){
                                var desc = $(this).find('.description-text').text();
                                var descLen = $(this).find('.description-text').text().length;
                                if( descLen > 151 ){
                                    desc = desc.substr(0,150) +'...';
                                }
                                $(this).find('.description-text').text(desc);
                            });
                        }
                    }
                });
            }
        }

        //inner page job ends
        $(".news-area").includeFeed({
            baseSettings: {
                rssURL: "/newsrss.aspx?categories=1519,1520,1521"
            },
            templates: {
                itemTemplate: "<div class='news-section'><figure><a href='{{link}}' class='blog-image'><span style='background-image:url({{imageurl}})'></span><div class='figcaption'><h3 class='title'><a href='{{link}}'>{{title}}</a></h3><h4>{{pubDate}}</h4><span class='news-link'><a class='news-article' href='{{link}}'><i class='fa fa-chevron-right fa-fw'></i></a></span></div></a></figure></div>"
            },
            complete: function() {
                $(this).owlCarousel({
                    loop: true,
                    autoplay: true,
                    nav: true,
                    responsive: {
                        0: {
                            items: 1,
                            margin: 0
                        },
                        768: {
                            items: 2,
                            margin: 15
                        },
                        992: {
                            items: 2,
                            margin: 40
                        },
                        1200: {
                            items: 4,
                            margin: 30
                        }
                    }
                })
            }
        });
        if( $(".news-testimonial ul").length ){
            var dataURL = $(".news-testimonial ul").attr("data-url");
            if( dataURL!=undefined && dataURL.length ){
                $(".news-testimonial ul").includeFeed({
                    baseSettings: {
                        rssURL: [dataURL || "/newsRSS.aspx"],
                        limit: 200,
                        addNBSP: false
                    }, //end of base setting
                    templates: {
                        itemTemplate: "<li class='catgry-news equal-categry'><div class='cagry-img '><img src='{{imageurl}}' alt='{{title}}'></div><div class='catgry-desc'><h3><a href='{{link}}' title='{{title}}'>{{title}}</a></h3><div class='news-content'><span class='rss-item-description'>{{description}}</span></div><a class='news-article' href='{{link}}'><i class='fa fa-chevron-right fa-fw'></i></a></div></li>"
                    }, //end of templates
                    complete: function() {
                            $(".catgry-news").each(function(i) {
                                var titleLen = $(this).find('h3 a').text();
                                var descLen = $(this).find('.rss-item-description').text();
                                if (titleLen.length > 50) {
                                    $(this).find('h3 a').text(titleLen.substr(0, 55) + '...');
                                }
                                if (descLen.length > 10) {
                                    $(this).find('.rss-item-description').text(descLen.substr(0, 100) + '...');
                                }
                            });
                        } // end of complete function
                }); // end of include feed
            }

            //manual collapse
            $('.news-article.btn-toggle').click( function(){
                $(this).parents('.catgry-news').find('.collapse').toggleClass('in');
            });

        };


        //
        if( $('#job-ad-template').length ){
            $('.job-detail-centre .jobdetail-padding').append('<div id="latest-news" class="jxt-similar-jobs-container"><h2>Latest News</h2><div class="jxt-similar-news-holder"><ul></ul></div></div>');
            $("#latest-news .jxt-similar-news-holder ul").includeFeed({
                baseSettings: {
                    rssURL: "/newsrss.aspx",
                    addNBSP: false,
                    limit: 15,
                },
                templates: {
                    itemTemplate: "<li><a href='{{link}}'><span class='jxt-similar-job-title'>{{title}}</span></a><small class='jxt-pubdate'>{{pubDate}}</small><div class='jxt-desc'>{{description}}</div></li>"
                },
                complete: function() {
                    $("#latest-news .jxt-similar-news-holder").jCarouselLite({
                                visible: jxt.settings.similarJobs.visible,
                                auto: jxt.settings.similarJobs.auto,
                                speed: jxt.settings.similarJobs.speed,
                                vertical: jxt.settings.similarJobs.vertical
                                // this won't work with horizontal scrolling, too complicated with all the variables. But I'm keeping the option in the global object anyway.
                            });
                    
                    
                }
            });
        }

        // end of innerpage-testimonials
        if ($(".consultant-full-width").length > 0) {
            $("body").addClass('full-width-team');
        }
        $(".inner-banner .container").append($(".dynamic-content-holder .banner h1:first"));

        if( $('div[data-webcontainer="wc-employer"]').length ){
            $('body').addClass('wc-employer');
            $('#dynamic-side-right-container').removeClass('hidden-sm hidden-xs');
        }

        // Landing page 1
        if( $('#lp1-template').length ){
            var tpKeyword = $('.banner').data('keyword');

            if( tpKeyword.length ){
                $('.blog-wrap h3 .blog-name').text(tpKeyword);    
                $(".news-list").includeFeed({
                    baseSettings: {
                        rssURL: "/newsrss.aspx?keywords="+tpKeyword,
                        limit: 3,
                        addNBSP: false,
                    },
                    templates: {
                        itemTemplate: "<div class='list-group'><a href='{{link}}'><img src='{{imageurl}}' alt='{{title}}'><p class='title'>{{title}}</p></a></div>"
                    },
                    complete: function() {
                        if( !$(this).children().length ){
                            $('.blog-wrap').hide();
                        }
                    }
                });

                
                $('.mem-list').includeFeed({
                    baseSettings: {
                        rssURL: "/ConsultantsRSS.aspx?category="+tpKeyword,
                        limit: 3,
                        addNBSP: false,
                        repeatTag: "consultant"
                    }, //end of base setting
                    templates: {
                        itemTemplate: '<div class="list-group"><a href="/t/{{FriendlyURL}}" title="{{FirstName}} {{LastName}}"><img src="{{ImageURL}}" alt="{{FirstName}} {{LastName}}"><p><strong>{{FirstName}} {{LastName}}</strong><br>{{PositionTitle}}</p></a></div>'
                    }, //end of templates
                    complete: function() {
                        if( !$(this).children().length ){
                            $('.member-wrap').hide();
                        }
                    }
                });
            }

            $('#dynamic-side-right-container').removeClass('hidden-sm hidden-xs');
        }

        // 8. System pages changes
        // ========================================
        if ($('#site-topnav .user-loggedIn').length) {
            $('a#HiddenMemLog').prop("href", "/member/default.aspx").text('My Dashboard');
        }

        //check login status and prevent from job apply if not logged in
        //take apply now button to login page
        $('.apply-now-link a').click( function(e){
            if( $('#miniMemberLoggedIn').length < 1 ){
                e.preventDefault();
                var curpath = '/applyjob'+window.location.pathname;
                curpath = encodeURIComponent(curpath);
                window.location = '/member/login.aspx?returnurl='+curpath;
            }
        });


        $(window).scroll(function() {
            var scrolly = $(window).scrollTop()
                // if(scrolly > $(".r30_banner").offset().top + $(".r30_banner").height()){
            if (scrolly > 50) {
                $("#Top-nav-sticky").addClass("bg")
            } else {
                $("#Top-nav-sticky").removeClass("bg")
            }
        });
        var pageTitle = window.location.pathname.replace(/\//g, "");
        if (pageTitle != "") {
            if (pageTitle == "graduatespodcasts" || pageTitle == "graduatescareer-advice" || pageTitle == "graduatespodcasts" || pageTitle == "graduatescareer-advice") {
                $("body").addClass("inner-banner-layer");
            }
            if (pageTitle == "advancedsearch.aspx" || pageTitle == "advancedsearch.aspx" || pageTitle == "graduate-jobs") {
                $(".advace-job").show();
            }
            if( pageTitle.indexOf('graduate-jobs') > -1 ){
                $('#prefix_left-navigation > ul > li').prepend('<span>Industries</span>');
                $('#prefix_left-navigation > ul > li > a').hide();
                $(".advace-job").show();
            }
            $('#AdvancedSearchFilter_PnlClassification > a').text('Industries');
            $("body").addClass(pageTitle);
        }
        if ($('.jxt-news-container').length) {
            $("body").addClass("news-inner-layer");
        }
        /*var pageTitle = window.location.pathname.replace("/", "");
        if (pageTitle != "") {
            $("body").addClass(pageTitle);
        }*/
        // inner banners
        // var pageTitle = window.location.pathname.replace(/\//g, "");
        // console.log(pageTitle);
        // if (pageTitle != "") {
        //     $("body").addClass(pageTitle);
        // }

        $(window).resize(function() {
            equalhight();
            equalhight2();
            equalhight3();
            equalhight4();
            equalhight5();
            equalhight6();
        });
        $(window).load(function() {
            equalhight();
            equalhight2();
            equalhight3();
            equalhight4();
            equalhight5();
            equalhight6();
        });
        /*        $(".panel-heading").click(function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    var topPos = $(".header-scroll").is(':visible') ? 0 : $("#Top-nav-sticky").outerHeight();
                    setTimeout(function() {
                        $("html, body").animate({
                            scrollTop: $this.offset().top - topPos
                        }, 500);
                    }, 500);
                });*/
        $(window).scroll(function() {
            if ($(".homebanner-text > a").length > 0) {
                if (($("#Top-nav-sticky").offset().top + $("#Top-nav-sticky").outerHeight()) > ($(".homebanner-text > a").outerHeight() + $(".homebanner-text > a").offset().top)) {
                    $(".phoneTop").addClass('active');
                } else {
                    $(".phoneTop").removeClass('active');
                }
            }
        });
        // $.each(document.body.classList, function(index, val) {
        //     if (val.indexOf("news") > -1) {
        //         $(".jxt-news-container h1").eq(0).html("All blogs");
        //         $(window).load(function() {
        //             $(".jxt-news-container h1").eq(0).html("All blogs");
        //         });
        //     }
        // });
        /*if ($("body").hasClass('news.aspx')) {}*/
        // News
        if($('.jxt-news-container').length && !$('.jxt-single-item').length){
            $(".jxt-news-container h1").text("All blogs");
        }
        $("a.scroll-video").click(function(event) {
            event.preventDefault();
        });
        $("a.scroll-video > span").click(function(event) {
            event.preventDefault();
            var goToElement = $(this).closest('a.scroll-video').attr('href');
            var topPos = $(".header-scroll").is(':visible') ? 0 : $("#Top-nav-sticky").outerHeight();
            $("html, body").animate({
                scrollTop: $(goToElement).offset().top - topPos
            }, 500);
        });
        bootstrapModal("#myModalRequest", "#myBtnRequest", ".close");
        bootstrapModal("#myModalNewsletter", "#myBtnNewsletter", ".close");
        bootstrapModal("#myModalUni", "#myBtn3", ".close");
        bootstrapModal("#myModal", "#myBtn4", ".close");
        bootstrapModal("#myModal", "#cv-drop", ".close");
        
        if (window.location.href.split("/")[window.location.href.split("/").length - 1] == "meet-the-team") {
            $("body").addClass("meet-header");
        }
        $("#resultsList .job-holder").each(function(index, el) {
            $(el).find('.locandsalary').insertAfter($(el).find('.job-breadcrumbs'));
            $(el).find('span').wrap("<div class='labels-wrapper'></div>")
            $("<span class='labels location-label'>Location</span>").insertBefore($(el).find('.locandsalary .jxt-result-loc'));
            $("<span class='labels area-label'>Area</span>").insertBefore($(el).find('.locandsalary .jxt-result-area'));
            $("<span class='labels salary-label'>Salary</span>").insertBefore($(el).find('.locandsalary .jxt-result-salary'));
            $("<span class='labels worktype-label'>Contract</span>").insertBefore($(el).find('.locandsalary .jxt-result-worktype'));
        });
        /* custom content changes */
        $(".jxt-news-item-image").each(function(index, el) {
            var link = $(el).siblings('.jxt-news-item-title').find(' > a').attr('href');
            $(el).find('img').wrap('<a href="' + link + '"></a>');
        });
        $(".jxt-news-item-category").each(function(index, el) {
            var str = $(el).html();
            str = str.replace(/Filed under/gi, 'Found in');
            $(el).html(str);
        });
        if ($("#ctl00_ContentPlaceHolder1_lbRefine").length > 0) {
            var str = $("#ctl00_ContentPlaceHolder1_lbRefine").html();
            str = str.replace(/Refine/gi, 'Search');
            $("#ctl00_ContentPlaceHolder1_lbRefine").html(str);
        }
    });

    function bootstrapModal(modal, button, close) {
        if ($(button).length > 0) {
            var modal = $(modal)[0];
            // Get the button that opens the modal
            var btn = $(button)[0];
            // Get the <span> element that closes the modal
            var span = $(modal).find(close)[0];
            // When the user clicks the button, open the modal
            btn.onclick = function(event) {
                    event.preventDefault();
                    modal.style.display = "block";
                    $("body").addClass('hide-scroll');
                }
                // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                    $("body").removeClass('hide-scroll');
                    modal.style.display = "none";
                }
                // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    $("body").removeClass('hide-scroll');
                    modal.style.display = "none";
                }
            }
        }
    }

    function equalhight() {
        /*var $height = 0;
        $(".team-section img").each(function() {
            $(this).css("height", "auto");
            if (($(this).height()) > $height) {
                $height = $(this).outerHeight();
            }
        });
        $(".team-section img").each(function() {
            $(this).css("height", $height);
        });*/
    }

    function equalhight2() {
        var $height = 0;
        $(".team-section").each(function() {
            $(this).css("height", "auto");
            if (($(this).height()) > $height) {
                $height = $(this).outerHeight();
            }
        });
        $(".team-section").each(function() {
            $(this).css("height", $height);
        });
    }

    function equalhight3() {
        var $height = 0;
        $(".equal-img").each(function() {
            $(this).css("height", "auto");
            if (($(this).height()) > $height) {
                $height = $(this).outerHeight();
            }
        });
        $(".equal-img").each(function() {
            $(this).css("height", $height);
        });
    }

    function equalhight4() {
        var $height = 0;
        $(".equal-categry").each(function(index) {
            $(this).css("height", "auto");
            if (($(this).height()) > $height) {
                $height = $(this).outerHeight();
            }
            console.log(index);
        });
        $(".equal-categry").each(function() {
            $(this).css("height", $height);
        });
    }

    function equalhight5() {
        var $height = 0;
        $(".news-section").each(function() {
            $(this).css("height", "auto");
            if (($(this).height()) > $height) {
                $height = $(this).outerHeight();
            }
        });
        $(".news-section").each(function() {
            $(this).css("height", $height);
        });
    }

    function equalhight6() {
        // var $height = 0;
        // $(".job-box").each(function() {
        //     $(this).css("height", "auto");
        //     if (($(this).height()) > $height) {
        //         $height = $(this).outerHeight();
        //     }
        // });
        // $(".job-box").each(function() {
        //     $(this).css("height", $height);
        // });
    }
    // custom function for checking if images are loaded
    // call to function : $([parent element of images]).checkImagesLoaded([name of function to be called on complete])
    $.fn.checkImagesLoaded = function(callback) {
        var parentElem = $(this);
        var childrenImgs = $(this).find('img');
        var imgCount = childrenImgs.length;
        var imgCounter = 0;
        parentElem.find('li').addClass('loading');
        childrenImgs.on('load', function() {
            ++imgCounter;
            if (imgCount == imgCounter) {
                console.log("all images loaded successfully");
                callback();
                parentElem.find('li').removeClass('loading');
            } else {
                console.log("images remaining - " + parseInt(imgCount - imgCounter));
            }
        })
    }

    function fitToScreenSlider() {
        $(".modal").height($(window).height());
    }
    $(window).scroll(function() {
        //Full height
        fitToScreenSlider();
        // stickyHeader();
    });
    $(window).resize(function() {
        //Full height
        fitToScreenSlider();
        //stickyHeader();
    });
})(jQuery);


// Custom Function
// ===========================================================================

//US states variable
var uniList = [ unescape("Aberdeen"),unescape("Abertay"),unescape("Aberystwyth"),unescape("Anglia Ruskin"),unescape("Arts University Bournemouth"),unescape("Aston"),unescape("Bangor"),unescape("Basingstoke College of Technology"),unescape("Bath"),unescape("Bath Spa"),unescape("Bedfordshire"),unescape("Birkbeck"),unescape("Birmingham"),unescape("Birmingham City"),unescape("Bishop Grosseteste"),unescape("Bolton"),unescape("Bournemouth"),unescape("BPP University"),unescape("Bradford"),unescape("Brighton"),unescape("Bristol"),unescape("Brunel"),unescape("Buckingham"),unescape("Bucks New"),unescape("Cambridge"),unescape("Canterbury Christ Church"),unescape("Cardiff"),unescape("Cardiff Metropolitan University"),unescape("Central Lancashire"),unescape("Chester"),unescape("Chichester"),unescape("City University London"),unescape("College of Estate Management"),unescape("Cornwall College"),unescape("Courtauld Institute of Art"),unescape("Coventry"),unescape("Cumbria"),unescape("De Montfort"),unescape("Derby"),unescape("Dundee"),unescape("Durham"),unescape("Durham University Business School"),unescape("East Anglia"),unescape("East London"),unescape("Edge Hill"),unescape("Edinburgh"),unescape("Edinburgh Napier"),unescape("Essex"),unescape("Exeter"),unescape("Faculty of Health, Social Care and Education"),unescape("Falmouth University"),unescape("Glasgow"),unescape("Glasgow Caledonian"),unescape("Gloucestershire"),unescape("Glyndwr"),unescape("Goldsmiths"),unescape("Greenwich"),unescape("Harper Adams"),unescape("Heriot-Watt"),unescape("Hertfordshire"),unescape("Heythrop College"),unescape("Highlands and Islands"),unescape("Huddersfield"),unescape("Hull"),unescape("ifs University College"),unescape("Imperial College London"),unescape("Keele"),unescape("Kent"),unescape("King's College London"),unescape("Kingston"),unescape("Lancaster"),unescape("Leeds"),unescape("Leeds Metropolitan"),unescape("Leeds Trinity University"),unescape("Leicester"),unescape("Lincoln"),unescape("Liverpool"),unescape("Liverpool Hope"),unescape("Liverpool John Moores"),unescape("London Metropolitan"),unescape("London School of Economics"),unescape("London South Bank"),unescape("Loughborough"),unescape("Manchester"),unescape("Manchester Metropolitan"),unescape("Manchester School of Architecture"),unescape("Middlesex"),unescape("Newcastle"),unescape("Newman University"),unescape("Northampton"),unescape("Northumbria"),unescape("Norwich University of the Arts"),unescape("Nottingham"),unescape("Nottingham Trent"),unescape("Open College of the Arts"),unescape("Open University"),unescape("Oxford"),unescape("Oxford Brookes"),unescape("Oxford Brookes University Business School"),unescape("Pearson College"),unescape("Plymouth"),unescape("Portsmouth"),unescape("Queen Margaret"),unescape("Queen Mary"),unescape("Queen's – Belfast"),unescape("Reading"),unescape("Robert Gordon"),unescape("Roehampton"),unescape("Royal Academy of Music"),unescape("Royal Agricultural University"),unescape("Royal Central School of Speech & Drama"),unescape("Royal College of Music"),unescape("Royal Conservatoire of Scotland"),unescape("Royal Holloway"),unescape("Royal Northern College of Music"),unescape("Royal Veterinary College"),unescape("Salford"),unescape("Sheffield"),unescape("Sheffield Hallam"),unescape("SOAS"),unescape("Southampton"),unescape("Southampton Solent"),unescape("St Andrews"),unescape("St George's, University of London"),unescape("St Mark and St John"),unescape("St Mary's"),unescape("Staffordshire"),unescape("Stirling"),unescape("Strathclyde"),unescape("Sunderland"),unescape("Surrey"),unescape("Sussex"),unescape("Swansea"),unescape("Swansea Metropolitan"),unescape("Teesside"),unescape("Truro and Penwith College"),unescape("Ulster"),unescape("University Campus Suffolk"),unescape("University College Birmingham"),unescape("University College London"),unescape("University for the Creative Arts"),unescape("University of Law"),unescape("University of South Wales"),unescape("University of the Arts"),unescape("University of Wales, Trinity Saint David"),unescape("Warwick"),unescape("West London"),unescape("West of England, Bristol"),unescape("West of Scotland"),unescape("Westminster"),unescape("Winchester"),unescape("Wolverhampton"),unescape("Worcester"),unescape("York"),unescape("York St John"),unescape("Other") ];

var degreeSubj = [ unescape("Academic studies in education"),unescape("Academic studies in nursery education"),unescape("Academic studies in primary education"),unescape("Academic studies in specialist education"),unescape("Accountancy"),unescape("Accountancy, finance, business & management studies"),unescape("Acoustics & vibration"),unescape("Acting"),unescape("Adult nursing"),unescape("Aerospace engineering"),unescape("African studies"),unescape("Agricultural sciences"),unescape("Agriculture"),unescape("Agriculture, horticulture & veterinary sciences"),unescape("American studies"),unescape("Anatomy, physiology & pathology"),unescape("Ancient history"),unescape("Ancient language studies"),unescape("Animal science"),unescape("Animation"),unescape("Anthropology"),unescape("Archaeology"),unescape("Architecture"),unescape("Architecture, building & planning"),unescape("Art & design"),unescape("Artificial intelligence"),unescape("Asian (other) studies"),unescape("Astronomy"),unescape("Audio technologies"),unescape("Australasian studies"),unescape("Banking"),unescape("Bioengineering, biomedical engineering & clinical engineering"),unescape("Biological sciences"),unescape("Biology"),unescape("Biotechnologies"),unescape("Botany"),unescape("British & Irish history"),unescape("Buddhism"),unescape("Building & construction"),unescape("Business studies"),unescape("Celtic studies"),unescape("Chemical, process & energy engineering"),unescape("Chemistry"),unescape("Chinese studies"),unescape("Choreography"),unescape("Christianity"),unescape("Cinematics & photography"),unescape("Cinematography"),unescape("Civil engineering"),unescape("Classical Greek studies"),unescape("Classical studies"),unescape("Clothing/fashion design"),unescape("Communications engineering"),unescape("Comparative literary studies"),unescape("Complementary medicines, therapies & well-being"),unescape("Composition"),unescape("Computational physics"),unescape("Computer generated visual & audio effects"),unescape("Computer science"),unescape("Computing & information technology"),unescape("Counselling"),unescape("Craft skills"),unescape("Crafts"),unescape("Criminology"),unescape("Dance"),unescape("Dance & culture"),unescape("Dance & drama"),unescape("Dental nursing"),unescape("Dentistry"),unescape("Divinity"),unescape("Drama"),unescape("Earth sciences"),unescape("Ecology"),unescape("Economics"),unescape("Education & teaching"),unescape("Electronic & electrical engineering"),unescape("Engineering"),unescape("Engineering & manufacturing"),unescape("English language"),unescape("English language & literature"),unescape("English literature"),unescape("English studies"),unescape("Environmental & marine biology"),unescape("Environmental health"),unescape("Environmental sciences"),unescape("European studies"),unescape("Fabric & leather crafts"),unescape("Farming"),unescape("Film & sound recording"),unescape("Finance"),unescape("Fine art"),unescape("Food & drink"),unescape("Food, leisure & hospitality"),unescape("Forensic & archaeological sciences"),unescape("Forestry & arboriculture"),unescape("French studies"),unescape("Gaelic studies"),unescape("Games"),unescape("Genetics"),unescape("Geography & geology"),unescape("Geology"),unescape("German studies"),unescape("Glass crafts"),unescape("Graphic design"),unescape("Health Information Systems"),unescape("Heritage studies"),unescape("Hinduism"),unescape("History"),unescape("History of art"),unescape("Horticulture"),unescape("Hospitality"),unescape("Human geography"),unescape("Human resource management"),unescape("Illustration"),unescape("Imaginative writing"),unescape("Industrial/product design"),unescape("Information management"),unescape("Information systems"),unescape("Interactive & electronic design"),unescape("Interior design"),unescape("International politics"),unescape("Investment & insurance"),unescape("Irish studies"),unescape("Islam"),unescape("Italian studies"),unescape("Japanese studies"),unescape("Journalism"),unescape("Judaism"),unescape("Landscape & garden design"),unescape("Latin studies"),unescape("Law"),unescape("Law by geographic area"),unescape("Law by topic"),unescape("Learning disability nursing"),unescape("Leisure & tourism studies"),unescape("Linguistics"),unescape("Linguistics & classics"),unescape("Livestock"),unescape("Management studies"),unescape("Marine sciences"),unescape("Maritime geography"),unescape("Maritime technologies"),unescape("Marketing"),unescape("Material technologies"),unescape("Mathematics"),unescape("Mathematics & statistics"),unescape("Mechanical engineering"),unescape("Media & creative arts"),unescape("Media Studies"),unescape("Medical physics"),unescape("Medical technology"),unescape("Medicine"),unescape("Medicine, dentistry & optometry"),unescape("Mental health nursing"),unescape("Metal crafts"),unescape("Microbiology"),unescape("Middle Eastern studies"),unescape("Midwifery"),unescape("Minerals technologies"),unescape("Modern European languages & cultural studies"),unescape("Modern history"),unescape("Molecular biology, biophysics & biochemistry"),unescape("Moving image techniques"),unescape("Music"),unescape("Music education/teaching"),unescape("Music studies"),unescape("Music technology & industry"),unescape("Musical performance"),unescape("Musicology"),unescape("Naval architecture"),unescape("Neuroscience"),unescape("Nursery teaching"),unescape("Nursing"),unescape("Nursing, health & wellbeing"),unescape("Nutrition & Dietetics"),unescape("Occupational health & safety"),unescape("Office skills"),unescape("Operational research"),unescape("Optometry"),unescape("Paramedical science"),unescape("Performance & live arts"),unescape("Pharmacology, toxicology & pharmacy"),unescape("Philosophy"),unescape("Philosophy, theology & religion"),unescape("Photography"),unescape("Physical geography"),unescape("Physical Sciences"),unescape("Physics"),unescape("Physiotherapy"),unescape("Planning (urban, rural & regional)"),unescape("Podiatry"),unescape("Politics"),unescape("Portuguese studies"),unescape("Primary teaching"),unescape("Producing & directing motion pictures"),unescape("Production & manufacturing engineering"),unescape("Psychology"),unescape("Publishing"),unescape("Recreation & leisure studies"),unescape("Reed crafts"),unescape("Research & study skills in education"),unescape("Rural estate management"),unescape("Russian & East European studies"),unescape("Scandinavian studies"),unescape("Scottish studies"),unescape("Secondary teaching"),unescape("Social policy"),unescape("Social studies"),unescape("Social work"),unescape("Sociology"),unescape("Software engineering"),unescape("Spanish studies"),unescape("Specialist teaching"),unescape("Speech & language therapy"),unescape("Sport & exercise science"),unescape("Sport sciences"),unescape("Sports coaching"),unescape("Statistics"),unescape("Surface decoration"),unescape("Systems engineering"),unescape("Teacher training"),unescape("Technologies"),unescape("Theatre studies"),unescape("Theology"),unescape("Topical history"),unescape("Translation studies"),unescape("Types of dance"),unescape("Types of music"),unescape("Veterinary medicine"),unescape("Visual & audio effects"),unescape("Welsh studies"),unescape("Wood crafts"),unescape("World history"),unescape("World languages & cultural studies"),unescape("Zoology"),unescape("Other") ];

var jobRole = [ unescape("Account Management"),unescape("Accountancy"),unescape("Administration"),unescape("Analst"),unescape("Broking"),unescape("Client Services"),unescape("Communications"),unescape("Consuling"),unescape("Design"),unescape("Engineering"),unescape("Executive Search/eadhunting"),unescape("HR"),unescape("Marketing"),unescape("Operations"),unescape("Programmer/eveloper"),unescape("Project Management"),unescape("Recruitment"),unescape("Researching"),unescape("Sales"),unescape("Support"),unescape("Trading"),unescape("I'm open to ideas") ];

var langList = [ unescape("Afrikaans"),unescape("Albanian"),unescape("Amharic"),unescape("Arabic"),unescape("Armenian"),unescape("Azerbaijani"),unescape("Balochi"),unescape("Basque"),unescape("Belarusian"),unescape("Bengali"),unescape("Bengali"),unescape("Bosnian"),unescape("Bulgarian"),unescape("Burmese"),unescape("Burmese"),unescape("Cantonese"),unescape("Catalan"),unescape("Chichewa"),unescape("Croatian"),unescape("Czech"),unescape("Danish"),unescape("Danish"),unescape("Dari"),unescape("Dutch"),unescape("English"),unescape("Estonian"),unescape("Farsi"),unescape("Filipino"),unescape("Finnish"),unescape("French"),unescape("German"),unescape("Greek"),unescape("Gujarati"),unescape("Hebrew"),unescape("Hindi"),unescape("Hungarian"),unescape("Igbo"),unescape("Indonesian"),unescape("Italian"),unescape("Japanese"),unescape("Korean"),unescape("Kurdish"),unescape("Latvian"),unescape("Lingala"),unescape("Lithuanian"),unescape("Malay"),unescape("Malayalam"),unescape("Mandarin"),unescape("Moldovan"),unescape("Ndebele"),unescape("Norwegian"),unescape("Pashto"),unescape("Persian"),unescape("Polish"),unescape("Portuguese"),unescape("Punjabi"),unescape("Romanian"),unescape("Russian"),unescape("Serbian"),unescape("Sinhala"),unescape("Slovak"),unescape("Somali"),unescape("Spanish"),unescape("Swahili"),unescape("Swedish"),unescape("Tamil"),unescape("Thai"),unescape("Tigrinya"),unescape("Turkish"),unescape("Twi"),unescape("Urdu"),unescape("Vietnamese"),unescape("Welsh"),unescape("Yoruba"),unescape("Other") ];

function CustomFunction(pageurl){
    //console.log('this is triggered before ' + pageurl);
    if( pageurl == "member/profile.aspx" ){
        
        //education
        if( $('#newEducation').length ){
            $('label[for="ctl00_ContentPlaceHolder1_tbEducationAddInstitute"]').html('University <span class="form-required">*</span>:');
            $('label[for="ctl00_ContentPlaceHolder1_tbEducationAddQualificationName"]').html('Degree subject <span class="form-required">*</span>:');
        }


        //setting the list
        $('select[id*="EducationAddQualificationLevel"] option, select[id*="EducationQualificationLevel"] option').each( function(){
            if( $(this).val() == "" || $(this).val() == 6 || $(this).val() >= 14 ){
                //do nothing
            }else{
                $(this).hide();
            }
        });
        //reordering the list
        $('select[id*="EducationAddQualificationLevel"] option[value=14]').insertBefore( $('select[id*="EducationAddQualificationLevel"] option[value=6]') );

        $('select[id*="EducationQualificationLevel"]').each( function(){
            $(this).find( 'option[value=14]' ).insertBefore( $(this).find('option[value=6]') );
        });
        


        $('input[id*="EducationAddInstitute"], input[id*="EducationInstitute"]').autocomplete({ source: uniList,minLength: 0 
        }).focus(function(){            
            // The following works only once.
            // $(this).trigger('keydown.autocomplete');
            // As suggested by digitalPBK, works multiple times
            $(this).autocomplete("search");
        }).blur(function(){ 
            var isInputContainsInDropDownList = false;
            if( uniList.indexOf( $(this).val() ) > -1  ) {
                isInputContainsInDropDownList = true;
            }
            if( !isInputContainsInDropDownList ) {
                $(this).parents('.profile-edit').find('.btn[id*="Save"]').attr("disabled","disabled"); 
            }else{
                $(this).parents('.profile-edit').find('.btn[id*="Save"]').removeAttr("disabled","disabled"); 
            }
        });

        $('input[id*="EducationAddQualificationName"], input[id*="EducationQualificationName"]').autocomplete({ source: degreeSubj, minLength: 0 
        }).focus(function(){ 
            $(this).autocomplete("search");
        }).blur(function(){ 
            var isInputContainsInDropDownList = false;
            if( degreeSubj.indexOf( $(this).val() ) > -1  ) {
                isInputContainsInDropDownList = true;
            }
            if( !isInputContainsInDropDownList ) {
                $(this).parents('.profile-edit').find('.btn[id*="Save"]').attr("disabled","disabled"); 
            }else{
                $(this).parents('.profile-edit').find('.btn[id*="Save"]').removeAttr("disabled","disabled"); 
            }
        });

        $('input[id*="ExperienceAddJobTitle"], input[id*="ExperienceJobTitle"]').autocomplete({ source: jobRole, minLength: 0 
        }).focus(function(){            
            $(this).autocomplete("search");
        }).blur(function(){ 
            var isInputContainsInDropDownList = false;
            if( jobRole.indexOf( $(this).val() ) > -1  ) {
                isInputContainsInDropDownList = true;
            }
            if( !isInputContainsInDropDownList ) {
                $(this).parents('.profile-edit').find('.btn[id*="Save"]').attr("disabled","disabled"); 
            }else{
                $(this).parents('.profile-edit').find('.btn[id*="Save"]').removeAttr("disabled","disabled"); 
            }
        });

        $('input[id*="LanguageName"]').autocomplete({ source: langList, minLength: 0 
        }).focus(function(){            
            $(this).autocomplete("search");
        }).blur(function(){ 
            var isInputContainsInDropDownList = false;
            if( langList.indexOf( $(this).val() ) > -1  ) {
                isInputContainsInDropDownList = true;
            }
            if( !isInputContainsInDropDownList ) {
                $(this).parents('.profile-edit').find('.btn[id*="LanguageAdd"]').attr("disabled","disabled"); 
            }else{
                $(this).parents('.profile-edit').find('.btn[id*="LanguageAdd"]').removeAttr("disabled","disabled"); 
            }
        });

        //getting all list of skill sets

        
        $('#tbSkillsAddSkill').autocomplete({
            minLength:0
        }).focus(function(){ 
            $(this).autocomplete("search");
        }).blur(function(){ 
            var isInputContainsInDropDownList = false;
            var typedSkill = $(this).val();
            $('#tbSkillsAddSkill').autocomplete('widget').find('li').each( function(){
                if( $(this).text() == typedSkill ){
                    isInputContainsInDropDownList = true;
                }
            });   
            
            if( !isInputContainsInDropDownList ) {
                $(this).parents('.profile-edit').find('.btn[id*="SkillsAdd"]').attr("disabled","disabled"); 
            }else{
                $(this).parents('.profile-edit').find('.btn[id*="SkillsAdd"]').removeAttr("disabled","disabled"); 
            }
        });

        //expanding the one column to fullwidth for attachment section
        if( $('#ctl00_ContentPlaceHolder1_upSummary > .row > .col-md-6').length == 1 ){
            $('#ctl00_ContentPlaceHolder1_upSummary > .row > .col-md-6').removeClass('col-md-6').addClass('col-md-12');
        }
        if( $('#attach-container .col-md-6').length == 1 ){
            $('#attach-container').find('.col-md-6').removeClass('col-md-6').addClass('col-md-12');
        }
        $('label[for*="DetailsSuburb"]').parent().removeClass('col-md-6').addClass('col-md-12');

        //hidding non mendatory field from education block
        $('label[for*="DetailsSecondaryEmail"], label[for*="DetailsState"], label[for*="DetailsPassportNumber"], label[for*="DetailsVideoURL"], label[for*="EducationAddCountry"], label[for*="EducationAddState"], label[for*="EducationAddOtherQualification"], label[for*="EducationAddGraduated"], label[for*="EducationAddGraduatedCredits"], label[for*="EducationAddStartMonth"], label[for*="EducationAddCurrent"], label[for*="RolePreferenceDesiredRegion"], label[for*="LanguageProficiency"]').parent().hide();

        $('label[for*="EducationCountry"], label[for*="EducationState"], label[for*="EducationOtherQualification"], label[for*="EducationGraduated"], label[for*="EducationGraduatedCredits"], label[for*="EducationStartMonth"], label[for*="EducationCurrent"]').parent().hide();
        

        $('#personalDetailsSlider')
            .removeAttr('data-ride')
            .find('.carousel-indicators, .slider-nav').hide();
        

        //Role
        $('label[for*="RolePreferenceDesiredLocation"]').text('Desired Region');
        $('label[for*="RolePreferenceJobClassification"]').text('Industry');
        $('label[for*="RolePreferenceJobSubClassification"]').text('Job Role');

        
        //hidding all other country list from Eligible except UK
        $('#ctl00_ContentPlaceHolder1_ddlRolePreferenceEligibleToWorkIn option[value!=16]').remove();
        $('#ctl00_ContentPlaceHolder1_ddlRolePreferenceEligibleToWorkIn').multiselect('rebuild');
        $(function() {
            /*$('.rw_RolePreference_EligibleToWorkIn ul.multiselect-container li').each( function(){
                var countryVal = $(this).find('input').val();
                if( countryVal != 16 ){
                    $(this).hide();
                }
            });*/
        });
        
    }//end of if pageurl
} //end of CustomFunction


$(document).ready(function(){
           $("input[value$='resume2']").click(function(){

        $("#secUploadResume").hide();
        $("#secExistingResume").show();
});

});




 $(document).ready(function() {
    if(window.location.pathname.indexOf("/news.aspx") > -1){
            $(".jxt-news-container h1").text('Give A Grad A Go Blog');
        } 
     if(window.location.pathname.indexOf('/job/emailfriend') > -1)
        {
            $(".breadcrumbs").hide();
            $('.content-holder h1').text('Is this the job for you or a friend? Then ping it to straight to the inbox!');
            $('#ctl00_ContentPlaceHolder1_lbJobTitle').hide();
            var job_title= $("#ef-jobtitle-field .form-input").text();
            $("#ef-jobtitle-field .form-input").html("<h2 class='job-title'>"+job_title+"</h2>");
        }     
     

 });