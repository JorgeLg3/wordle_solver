import numpy as np
import codecs
import re
import time

def sort_dict(dictionary, reverse=True):
    return dict(sorted(dictionary.items(), key=lambda item: item[1], reverse=reverse))


"""
FILTER FUNCION
Return the list of possible words which matches the filters:
	- raw_list : all the possible solutions of the wordle game
	- in_list : list of letters (string) that should be in the solution. default: empty list
	- not_l_list : list of letters (string) are NOT in the solution. default: empty list
	- first : first letter of the world. default: False
	- second : second letter of the world. default: False
	- third : third letter of the world. default: False
	- fourth : fourth letter of the world. default: False
	- fifth : fifth letter of the world. default: False
	- not_n_list : list of lists(strings) for each n position, of chars contained but not in the n position. default: empty list of lists
	- not_w_list : list of words which are not the solution. default: empty list
"""
def wordle_filter(raw_list, in_list=[], not_l_list='', in_n_list=['.', '.', '.', '.', '.'], not_n_list=[[], [], [], [], []], not_w_list=[]):

	filt_list = raw_list

	# Check that NOT contain all not contained chars
	for char in not_l_list:
		filt_list = list(filter(re.compile(f"[^{char}][^{char}][^{char}][^{char}][^{char}]").match, filt_list))

	# Check that contain all contained chars
	for char in in_list:
		filt_list = list(filter(re.compile(f".*[{char}]").match, filt_list))

	# Check char in desires positions
	filt_list = list(filter(re.compile(f"{in_n_list[0]}{in_n_list[1]}{in_n_list[2]}{in_n_list[3]}{in_n_list[4]}").match, filt_list))

	# check char contianed, but not in this positions
	for i in range(len(not_n_list)):
		for char in not_n_list[i]:
			filt_list = list(filter(re.compile('.'*i + '[^' + char + ']' + '.'*(4-i)).match, filt_list))

	#Clean of past try words
	final_list = [word for word in filt_list if word not in not_w_list]

	return final_list


"""COMPARE FUNCTION
    take solution, and hypothesis and compare to return the comparation info: in_list, not_l_list, in_n_list, not_n_list
"""
def compare_words(solution, hypothesis, in_list = None, not_l_list = None, in_n_list = None, not_n_list = None):
    if in_list is None:
        in_list = []
    if not_l_list is None:
        not_l_list = []
    if in_n_list is None:
        in_n_list = ['.', '.', '.', '.', '.',]
    if not_n_list is None:
        not_n_list = [[], [], [], [], []]

    # '-' if not in the word, 'o' if in the word, 'x' if in this position
    comparation = ['-', '-', '-', '-', '-',]
        
    for i in range(len(hypothesis)):
        if hypothesis[i] in solution:
            in_list.append(hypothesis[i])
            if hypothesis[i] == solution[i]:
                in_n_list[i] = hypothesis[i]
                comparation[i] = 'x'
            else:
                not_n_list[i].append(hypothesis[i])
                comparation[i] = 'o'
        else:
            not_l_list.append(hypothesis[i])
    return in_list, not_l_list, in_n_list, not_n_list, comparation


"""SCORE FUNCTION
    INPUTS: word to test, list of possible solutions
    
    OUTPUTS: the average score
    
    The score is compute as the average number of remaining words in the list after check with every single possible solution

"""
def score_fn(word_test, solution_list):
    scores = 0
    for possible_sol in solution_list:
        if possible_sol == word_test:
            scores += 1
        else:
            #print(possible_sol, word_test)
            in_l, not_l_l, in_n_l, not_n_l, *_ = compare_words(solution=possible_sol, hypothesis=word_test)
            #print(in_l, not_l_l, in_n_l, not_n_l)
            filtered_list = wordle_filter(solution_list, in_list=in_l, not_l_list=not_l_l, in_n_list=in_n_l, not_n_list=not_n_l, not_w_list=[word_test,])
            #print(filtered_list)
            scores += len(filtered_list)
        #print(scores, scores/len(solution_list))
    return scores/len(solution_list)
              
              
"""CHOOSE BEST FUNCTION
"""
def choose_opt(remaining_list, verbose=False):
    score_dict = dict()
    start_time = time.time()
    for idx, word in enumerate(remaining_list):
        time_2 = time.time()
        score_dict[word] = score_fn(word, remaining_list)
        if verbose:
            print(time.strftime("%H:%M:%S", time.gmtime(time.time() - start_time)), idx+1, word, score_dict[word], time.time() - time_2)
    sorted_score = sort_dict(score_dict, reverse=False)
    best_score = list(sorted_score.keys())[0]

    return best_score, sorted_score


def auto_solver(word_list, solution, init_word='reina', verbose=False):
    in_lists = []
    not_l_lists = []
    in_n_lists = ['.', '.', '.', '.', '.']
    not_n_lists = [[], [], [], [], []]
    not_w_lists = []
    solved = False
    iter = 1
    remain_list = word_list

    while not solved:
        if verbose: print(iter)
        # choose optimal word
        if iter == 1:
            try_word = init_word
        else:
            try_word, best_sol_list = choose_opt(remain_list)
        if verbose: print(try_word)

        # check coincidencies    
        if try_word == solution:
            solved = True
            if verbose: print('solution:', try_word)
            return try_word, iter
        else:
            not_w_lists.append(try_word)
            in_lists, not_l_lists, in_n_lists, not_n_lists, *_ = compare_words(solution, try_word, in_list = in_lists, not_l_list = not_l_lists, in_n_list = in_n_lists, not_n_list = not_n_lists)
            if verbose: print(in_lists, not_l_lists, in_n_lists, not_n_lists, not_w_lists)

            # filt list
            remain_list = wordle_filter(remain_list, in_list=in_lists, not_l_list=not_l_lists, in_n_list=in_n_lists, not_n_list=not_n_lists, not_w_list=not_w_lists)
            if verbose: print(remain_list)
            iter += 1
