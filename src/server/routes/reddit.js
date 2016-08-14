/*
* @Author: ziggy
* @Date:   2016-08-11 19:59:23
* @Last Modified by:   ziggy
*/

import reddit from 'redwrap';

/**
 * This function uses redwrap to call and parse the Reddit Api for the 
 * search term in the request. 
 */
function get_reddit_posts(req, resp){
  var search_term = req.body.search_term;
  reddit.r(search_term, function(err, data, res){
      if(err)
        return resp.send({error: true, payload: err});
      resp.send({error: false, payload: data.data});
  });
}

/**
 * This service takes the search term from the request, and uses it
 * to call the Reddit API.
 * @param  string req.body.search_term
 */
export default function redditService(req, resp){
  get_reddit_posts(req, resp);
}