
var resultsContainer = $('.coach-panels-wrapper');
var clearfix = $('<div/>', {class: 'clearfix'});   

  
/* Functions */

var getexperttypeName = function(id){
    
    var experttypename;
    var pid = id[0];

    $.each(jsonexperttype, function(i,role){
      
      if(role.id == pid)
        experttypename = role.name;
      });
      
      return experttypename;
}
      
var getfeedbacktypeName = function(id){
    var feedbacktypename;
    $.each(jsonfeedbacktype, function(i,role){
      if(role.id == id)
        feedbacktypename = role.name;
      });
      return feedbacktypename;
}
      
      
var displayCoach = function(i,jsonObj){

    var coachWrapper = $('<div/>',{class: 'coach-panel large-3 small-6 columns'} );

    if(((i+1)%3)==0){
      coachWrapper.addClass('endofrow');
    }

    var coachSummary = $('<div/>',{class: 'coach-summary', title: jsonObj.Name});

    
    var image = $('<img/>',{src: jsonObj.CoachImage});
    var top = $('<div/>', {class: 'top'});
    var bottom = $('<div/>', {class: 'bottom'});
    

    var bottomWrapper = $('<div/>');
    var title = $('<h4/>',{text: jsonObj.Name});

    var experttype = $('<p/>',{class: 'experttype', text:getexperttypeName(jsonObj.experttype)});
    var company = $('<p/>',{class: 'company', text: (jsonObj.Company=='REQUIRED')?'':jsonObj.Company});

    var price = $('<p/>',{class: 'company', text: '$'+jsonObj.CoachingRate + ' / ' + getfeedbacktypeName(jsonObj.feedbacktype) + ' Feedback'});
      
    var shortbio = $('<p/>',{class: 'bio', text: jsonObj.ShortBio});
    var viewmore = $('<a/>',{class: 'view-more', href:'/coaches/'+jsonObj.Username ,text: 'View Profile'});
   
    
    var topWrapper = $('<div/>');
    
    topWrapper.append(image);;
    top.append(topWrapper);
    
    bottomWrapper.append(title);
    bottomWrapper.append(experttype);
    bottomWrapper.append(company);
    bottomWrapper.append(price);
    bottomWrapper.append(shortbio);
    bottomWrapper.append(viewmore);

    bottom.append(bottomWrapper);
    
    coachSummary.append(top);
    coachSummary.append(bottom);
    coachSummary.append(clearfix);

    coachWrapper.append(coachSummary);
    resultsContainer.append(coachWrapper);

}

var isElementInArray = function(el,selection_array){
  if( $.inArray(el,selection_array) > -1 ){
    return true;
  }
  return false;
}
    
var generateSelectionArray = function(input,id){
  
  var dimension_array = [];

  $.each(input,function(i, el){

      if(dimension_array.length==0)
        sel_dimensions.push(id);
      dimension_array.push(el.value);

  });
  console.log('dimension_array '+dimension_array);
  return dimension_array;

}



/* on load */

/* filter featured coaches */
var onload_arr = [];

var landing_pages = ['featured','agents-and-casting-directors','directors-and-composers','college-faculty','performers'];
var landing_page_arr = [];


$.each(landing_pages, function(i,item){

  if(resultsContainer.hasClass(item)){

    $.each(jsonCoaches.data,function(j,coach){

      if($.inArray(item, coach.publiclisting) > -1){
        landing_page_arr.push(coach);
      }
    });

  }

});

/*
$.each(jsonCoaches.data,function(i,item){
  if(item.featuredtype=='true')
    onload_arr.push(item);  
});
$.each(onload_arr,displayCoach);
*/

$.each(landing_page_arr,displayCoach);
resultsContainer.append(clearfix);


