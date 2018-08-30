<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy" />
    <v-flex xs12>
      <v-card color="grey lighten-4">
        <v-card-text>
        이 정책으로 인해 {{effectSize}} 영향을 받으시는군요!<br>
        어떤 영향을 받으시는지 자세히 알려주세요.
        </v-card-text>
      </v-card>
      
      <v-form>

        <p class="question">
          먼저, 본인에 대해 조금만 더 자세히 설명해주세요. 예를 들면, <strong>'치과의사'</strong>보다는 <strong>'임플란트 전문 치과의사'</strong>처럼 
          상황, 배경, 직업 등을 고려하여 구체적으로 적어주세요.
        </p>
        <v-text-field
          v-validate="'required'"
          v-model="myEffect.stakeholder_detail"
          :error-messages="errors.collect('asx')"       
          name="stakeholder_detail" />

        <div>
          <p class="question">
            이 사람이 속해있는 사회적 집단 중, 이 정책과 관련된 집단은 무엇이 있나요?
            예를 들면, "건강보험 보장성 강화" 정책의 영향을 받는 "임플란트 전문 치과의사"라면, "의료인", "치과의사", "임플란트 전문 치과의사" 처럼 적어주세요. <br>
            최소 <strong style="color:red;">2개</strong>의 태그로 설명해주세요.<br>
          </p>
          <!-- <p class="body-1 prompt">
            <v-flex xs12>
              <v-card color="grey lighten-4">
                <v-card-text>나는 _______(으)로서 이 정책의 영향을 받는다.</v-card-text>
              </v-card>
            </v-flex>
          </p> -->
        </div>

        <v-combobox
          :value="selectedTags"
          :items="tags"
          item-text="name"
          item-value="name"
          label="태그를 적어주세요"
          :search-input.sync="search"
          :filter="filter"
          multiple
          hide-selected
          chips
          :rules="[validateInput]"
          textarea
          validate-on-blur
          @input="onInput">

          <template slot="no-data">
            <v-list-tile>
              <v-list-tile-content>
                <v-chip color="blue lighten-3" label small>{{hangulSearch}}</v-chip> 엔터키를 누르면 추가됩니다.
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <template slot="item" slot-scope="{ index, item, parent }">
            <v-chip color="blue lighten-3" label small>{{item.name}}</v-chip>
            <v-spacer></v-spacer>
            {{item.refs}}개
          </template>
          <template slot="selection" slot-scope="{ item, parent, selected }">
            <v-chip :selected="selected" label small>
              <span class="pr-2"> {{item}} </span>
              <v-icon small @click="parent.selectItem(item)">close</v-icon>
            </v-chip>
          </template>
        </v-combobox>

        <template v-if="selectedTags.length >= 2">
          <v-flex xs12>
            <p class="body-1 prompt question">
              <!-- <v-chip v-for="tag in selectedTags" :key="tag">
                {{tag}}
              </v-chip> -->
              {{myEffect.stakeholder_detail}}
              (으)로서 이 정책이 실현된다면 삶이 어떻게 달라지시나요?
            </p>
            <div class="triangle-obtuse">
              <v-textarea auto-grow v-model="myEffect.description" placeholder="여기에 적어주세요!"
                :rules="[(input) => { return input.length >= 10 ? true : '영향을 조금 더 자세히 써주세요!'}]"/>
            </div>
          </v-flex>
          <v-layout row wrap>
            <v-flex xs4 sm2 offset-sm2>
              <div>
                <!-- @click="myEffect.isBenefit === 1 ? myEffect.isBenefit = 0 : myEffect.isBenefit = 1" -->
                <svg alt="Sad by AomAm from the Noun Project" v-if="myEffect.isBenefit <= 0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 512 640" style="enable-background:new 0 0 512 512;" xml:space="preserve"><title>Sad-Emoji-Emotion-Face-Expression-Feeling</title><g><path d="M265.6,317v-8.9c2.8-1.6,6.5-3.7,10.1-6.2c13-8.7,19-16.5,19-24.5c0-13-10.9-17.8-15.6-19.2c-6.8-2.1-15.3-2.3-23.5-2.3   c-8.2,0-16.7,0.3-23.5,2.3c-4.7,1.4-15.6,6.1-15.6,19.2c0,8,6,15.8,19,24.5c3.7,2.4,7.3,4.6,10.1,6.2v8.9   c-41.5,4.2-55.9,34-56.6,35.4c-2.3,5-0.2,11,4.8,13.3c5,2.3,11,0.2,13.3-4.8c0.1-0.2,11.8-24.4,48.4-24.4   c35.9,0,47.9,23.3,48.5,24.5c1.7,3.6,5.3,5.7,9,5.7c1.4,0,2.9-0.3,4.2-0.9c5-2.3,7.2-8.3,4.8-13.3C321.5,351,307,321.2,265.6,317z"/><path d="M511.6,256c0-27.6-10.5-54.3-29.1-74.5c19.9-53.9-5.4-114.9-58.6-138.5c-26.3-11.6-56.1-12.4-82.9-2.4   c-16.7-20.4-39.8-34-66-38.6c-28.9-5.1-58,1.4-82,18.3c-9.1,6.4-17.1,14-23.8,22.8c-23.8-10.6-50.3-12.3-75.6-4.8   c-28.1,8.3-51.3,27.1-65.3,52.9c-16.3,30-17.6,65.6-4,96.6C9.3,206.6,0.9,229.8,0.4,254c-0.5,24.4,7.2,48.1,21.7,67.6   c-20.6,54,4.4,115.5,57.8,139.4c27.1,12.1,57.5,12.7,84.8,2c14.4,21.6,35.7,37.3,61,44.5c10.1,2.9,20.3,4.3,30.5,4.3   c18.4,0,36.5-4.7,53-13.8c14.5-8,27-19.3,36.5-32.8c25,8.1,51.8,7,76.2-3.3c27-11.4,48-32.6,59.1-59.7c9.6-23.6,10.7-49.5,3.3-73.7   C502,308.4,511.7,282.9,511.6,256z M463.6,329.4c7.8,21.1,7.5,44.3-1.1,65.1c-9.1,22.2-26.2,39.6-48.3,48.9   c-22.1,9.3-46.5,9.4-68.7,0.4c-4.6-1.9-9.8-0.1-12.4,4.1c-8.1,13.6-19.7,24.9-33.6,32.5c-21,11.6-45.2,14.4-68.3,7.7   c-23.1-6.6-42.1-21.8-53.8-42.8c-1.8-3.3-5.2-5.2-8.8-5.2c-1.5,0-3,0.3-4.4,1c-24,11.8-51.8,12.3-76.2,1.4   C42.9,422.4,22.5,369.2,42.7,324c1.6-3.5,1-7.6-1.5-10.5c-13.8-16.6-21.2-37.6-20.8-59.2c0.4-21.6,8.6-42.3,23-58.4   c2.8-3.1,3.4-7.6,1.5-11.3c-13.6-26.4-13.3-57.8,0.9-84c11.4-21.1,30.4-36.4,53.4-43.3c23-6.8,47.3-4.3,68.4,7.2   c4.6,2.5,10.3,1,13.2-3.3c6.3-9.7,14.3-18,23.7-24.6c19.6-13.8,43.4-19.1,67.1-15c23.6,4.1,44.2,17.2,58,36.8c2.8,4,8,5.4,12.4,3.3   c23.4-10.8,50.3-11,73.9-0.6c45.3,20,65.9,73.2,45.8,118.5c-1.7,3.9-0.8,8.4,2.3,11.3c17.7,16.8,27.8,40.5,27.8,64.9c0,0,0,0,0,0   c0,23.7-9.1,46-25.8,62.9C463.2,321.7,462.3,325.8,463.6,329.4z"/><path d="M434.7,162.7c4.1-14.7,2.3-30-5.1-43.3c-15.3-27.4-50.1-37.3-77.6-21.9c-7,3.9-12.9,9.1-17.7,15.4   c-25.1-13.3-51.7-20.2-78.3-20.2c-26.8,0-53.4,6.9-78.5,20.2c-16.2-21.5-46-29-70.9-16.6c-13.6,6.8-23.8,18.5-28.6,32.9   s-3.7,29.9,3.1,43.5c3.5,7.1,8.4,13.3,14.4,18.3c-19.5,31.7-30,66.7-30,101.1c0,47.4,20.4,86.5,59,113   c33.4,22.9,80.1,35.6,131.4,35.6c51.3,0,97.9-12.6,131.4-35.5c38.6-26.5,59-65.6,59-113c0-34-10.7-69.5-30-101.1   C425.2,183.6,431.5,173.9,434.7,162.7z M376.1,388.5c-30.1,20.7-72.8,32-120.1,32c-47.3,0-89.9-11.4-120.1-32   c-33.4-22.9-50.4-55.4-50.4-96.5c0-39,16.1-80.8,44.2-114.5c1.5-1.8,2.3-4,2.3-6.2c0,0,0-0.1,0-0.1c0-0.1,0-0.2,0-0.3   c-0.1-2.8-1.3-5.5-3.6-7.5c-4.2-3.5-10.5-3-14.1,1.3c-0.6,0.7-1.1,1.4-1.7,2.1c-0.5,0.6-0.9,1.1-1.4,1.7c-0.7,0.9-1.4,1.8-2.1,2.6   c-0.4,0.5-0.8,1.1-1.2,1.6c-0.4,0.5-0.8,1-1.2,1.6c-3.2-3-5.8-6.5-7.8-10.5c-9.1-18.3-1.7-40.5,16.6-49.6   c15.5-7.7,33.9-3.5,44.7,9.1c-4.9,3.3-9.7,6.8-14.5,10.6c-2.4,1.9-3.7,4.8-3.8,7.7c0,0.2,0,0.5,0,0.7c0,0.1,0,0.2,0,0.2   c0.2,1.9,0.9,3.8,2.2,5.5c0.5,0.6,1,1.1,1.6,1.6c0,0,0,0,0.1,0c0.3,0.2,0.6,0.4,0.9,0.6c0,0,0.1,0,0.1,0.1c0.3,0.2,0.6,0.3,0.9,0.5   c0,0,0,0,0.1,0c2.3,1.1,5,1.2,7.4,0.4c0,0,0.1,0,0.1,0c0.2-0.1,0.5-0.2,0.7-0.3c0,0,0.1,0,0.1,0c0.2-0.1,0.5-0.2,0.7-0.3   c0,0,0,0,0.1,0c0.5-0.3,1-0.6,1.4-0.9c6.6-5.3,13.7-10.2,21-14.6c0.1-0.1,0.2-0.1,0.3-0.2c24.3-14.5,50.4-22,76.4-22   c26.3,0,52.9,7.8,77.6,22.8c0.6,0.4,1.3,0.8,1.9,1.2c0.6,0.4,1.2,0.8,1.8,1.1c0.3,0.2,0.7,0.4,1,0.6c1.4,0.9,2.8,1.8,4.2,2.8   c0.2,0.2,0.5,0.3,0.7,0.5c0.8,0.5,1.6,1.1,2.3,1.6c0.3,0.2,0.6,0.4,0.9,0.6c0.7,0.5,1.3,1,2,1.5c4.4,3.3,10.7,2.4,14-2   c3.1-4.2,2.5-10-1.3-13.4c-0.3-0.2-0.5-0.5-0.8-0.7c-0.6-0.5-1.3-0.9-2-1.4c-0.4-0.3-0.8-0.6-1.2-0.9c-0.8-0.6-1.6-1.2-2.4-1.7   c-0.4-0.3-0.8-0.5-1.1-0.8c-0.6-0.4-1.2-0.9-1.9-1.3c2.8-3.3,6.2-6.1,10.1-8.3c17.8-10,40.4-3.6,50.4,14.2c4.8,8.6,6,18.6,3.3,28.1   c-1.9,6.6-5.4,12.4-10.3,17c-0.1-0.1-0.1-0.2-0.2-0.2c-3.1-4.2-6.4-8.2-9.8-12.2c-3.6-4.2-9.9-4.7-14.1-1c-4.2,3.6-4.7,9.9-1,14.1   c0.7,0.8,1.4,1.6,2.1,2.5c0,0,0.1,0.1,0.1,0.1c3.2,3.9,6.3,7.9,9.2,12c0.1,0.1,0.2,0.3,0.3,0.4c0.9,1.2,1.7,2.4,2.5,3.7   c20.6,30.4,32.1,65.3,32.1,98.5C426.4,333.1,409.5,365.6,376.1,388.5z"/><path d="M193.1,217.3c-6.2-11.5-20.7-15.8-32.2-9.6v0c-5.6,3-9.6,8-11.5,14.1s-1.1,12.5,1.9,18.1c3,5.6,8,9.6,14.1,11.5   c2.2,0.7,4.5,1,6.8,1c3.9,0,7.7-1,11.3-2.9C195,243.2,199.3,228.8,193.1,217.3z"/><path d="M324.6,211.8C324.6,211.8,324.6,211.8,324.6,211.8c-9.3,9.3-9.3,24.3,0,33.6c4.6,4.6,10.7,6.9,16.8,6.9s12.2-2.3,16.8-6.9   c9.3-9.3,9.3-24.3,0-33.6C348.9,202.5,333.8,202.5,324.6,211.8z"/></g><text x="0" y="527" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by AomAm</text><text x="0" y="532" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>
                <svg v-else alt="Happy by AomAm from the Noun Project" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 512 640" style="enable-background:new 0 0 512 512;" xml:space="preserve"><title>Happy-Emoji-Emotion-Face-Expression-Feeling_2</title><g><path d="M322.7,322.8c-31.3,12.6-51.2-5.4-57.1-12.1v-2.7c2.8-1.6,6.5-3.7,10.1-6.2c13-8.7,19-16.5,19-24.5   c0-13-10.9-17.8-15.6-19.2c-6.8-2.1-15.3-2.3-23.5-2.3c-8.2,0-16.7,0.3-23.5,2.3c-4.7,1.4-15.6,6.1-15.6,19.2c0,8,6,15.8,19,24.5   c3.7,2.4,7.3,4.6,10.1,6.2v2.7c-2.3,2.6-6.8,7-13.3,10.6c-13.2,7.4-27.9,7.9-43.8,1.5c-5.1-2.1-10.9,0.4-13,5.5   c-2.1,5.1,0.4,10.9,5.5,13c10.5,4.2,20.1,5.9,28.7,5.9c13.5,0,24.4-4.1,32.3-8.5c5.6-3.1,10.1-6.6,13.6-9.8c3.5,3.1,8,6.7,13.6,9.8   c7.9,4.4,18.8,8.5,32.3,8.5c8.6,0,18.2-1.6,28.7-5.9c5.1-2.1,7.6-7.9,5.5-13S327.8,320.8,322.7,322.8z"/><path d="M511.6,256c0-27.6-10.5-54.3-29.1-74.5c19.9-53.9-5.4-114.9-58.6-138.5c-26.3-11.6-56.1-12.4-82.9-2.4   c-16.7-20.4-39.8-34-66-38.6c-28.9-5.1-58,1.4-82,18.3c-9.1,6.4-17.1,14-23.8,22.8c-23.8-10.6-50.3-12.3-75.6-4.8   c-28.1,8.3-51.3,27.1-65.3,52.9c-16.3,30-17.6,65.6-4,96.6C9.3,206.6,0.9,229.8,0.4,254c-0.5,24.4,7.2,48.1,21.7,67.6   c-20.6,54,4.4,115.5,57.8,139.4c27.1,12.1,57.5,12.7,84.8,2c14.4,21.6,35.7,37.3,61,44.5c10.1,2.9,20.3,4.3,30.5,4.3   c18.4,0,36.5-4.7,53-13.8c14.5-8,27-19.3,36.5-32.8c25,8.1,51.8,7,76.2-3.3c27-11.4,48-32.6,59.1-59.7c9.6-23.6,10.7-49.5,3.3-73.7   C502,308.4,511.7,282.9,511.6,256z M463.6,329.4c7.8,21.1,7.5,44.3-1.1,65.1c-9.1,22.2-26.2,39.6-48.3,48.9   c-22.1,9.3-46.5,9.4-68.7,0.4c-4.6-1.9-9.8-0.1-12.4,4.1c-8.1,13.6-19.7,24.9-33.6,32.5c-21,11.6-45.2,14.4-68.3,7.7   c-23.1-6.6-42.1-21.8-53.8-42.8c-1.8-3.3-5.2-5.2-8.8-5.2c-1.5,0-3,0.3-4.4,1c-24,11.8-51.8,12.3-76.2,1.4   C42.9,422.4,22.5,369.2,42.7,324c1.6-3.5,1-7.6-1.5-10.5c-13.8-16.6-21.2-37.6-20.8-59.2c0.4-21.6,8.6-42.3,23-58.4   c2.8-3.1,3.4-7.6,1.5-11.3c-13.6-26.4-13.3-57.8,0.9-84c11.4-21.1,30.4-36.4,53.4-43.3c23-6.8,47.3-4.3,68.4,7.2   c4.6,2.5,10.3,1,13.2-3.3c6.3-9.7,14.3-18,23.7-24.6c19.6-13.8,43.4-19.1,67.1-15c23.6,4.1,44.2,17.2,58,36.8c2.8,4,8,5.4,12.4,3.3   c23.4-10.8,50.3-11,73.9-0.6c45.3,20,65.9,73.2,45.8,118.5c-1.7,3.9-0.8,8.4,2.3,11.3c17.7,16.8,27.8,40.5,27.8,64.9c0,0,0,0,0,0   c0,23.7-9.1,46-25.8,62.9C463.2,321.7,462.3,325.8,463.6,329.4z"/><path d="M434.7,162.7c4.1-14.7,2.3-30-5.1-43.3c-15.3-27.4-50.1-37.3-77.6-21.9c-7,3.9-12.9,9.1-17.7,15.4   c-25.1-13.3-51.7-20.2-78.3-20.2c-26.8,0-53.4,6.9-78.5,20.2c-16.2-21.5-46-29-70.9-16.6c-13.6,6.8-23.8,18.5-28.6,32.9   s-3.7,29.9,3.1,43.5c3.5,7.1,8.4,13.3,14.4,18.3c-19.5,31.7-30,66.7-30,101.1c0,47.4,20.4,86.5,59,113   c33.4,22.9,80.1,35.6,131.4,35.6c51.3,0,97.9-12.6,131.4-35.5c38.6-26.5,59-65.6,59-113c0-34-10.7-69.5-30-101.1   C425.2,183.6,431.5,173.9,434.7,162.7z M376.1,388.5c-30.1,20.7-72.8,32-120.1,32c-47.3,0-89.9-11.4-120.1-32   c-33.4-22.9-50.4-55.4-50.4-96.5c0-39,16.1-80.8,44.2-114.5c1.5-1.8,2.3-4,2.3-6.2c0,0,0-0.1,0-0.1c0-0.1,0-0.2,0-0.3   c-0.1-2.8-1.3-5.5-3.6-7.5c-4.2-3.5-10.5-3-14.1,1.3c-0.6,0.7-1.1,1.4-1.7,2.1c-0.5,0.6-0.9,1.1-1.4,1.7c-0.7,0.9-1.4,1.8-2.1,2.6   c-0.4,0.5-0.8,1.1-1.2,1.6c-0.4,0.5-0.8,1-1.2,1.6c-3.2-3-5.8-6.5-7.8-10.5c-9.1-18.3-1.7-40.5,16.6-49.6   c15.5-7.7,33.9-3.5,44.7,9.1c-4.9,3.3-9.7,6.8-14.5,10.6c-2.4,1.9-3.7,4.8-3.8,7.7c0,0.2,0,0.5,0,0.7c0,0.1,0,0.2,0,0.2   c0.2,1.9,0.9,3.8,2.2,5.5c0.5,0.6,1,1.1,1.6,1.6c0,0,0,0,0.1,0c0.3,0.2,0.6,0.4,0.9,0.6c0,0,0.1,0,0.1,0.1c0.3,0.2,0.6,0.3,0.9,0.5   c0,0,0,0,0.1,0c2.3,1.1,5,1.2,7.4,0.4c0,0,0.1,0,0.1,0c0.2-0.1,0.5-0.2,0.7-0.3c0,0,0.1,0,0.1,0c0.2-0.1,0.5-0.2,0.7-0.3   c0,0,0,0,0.1,0c0.5-0.3,1-0.6,1.4-0.9c6.6-5.3,13.7-10.2,21-14.6c0.1-0.1,0.2-0.1,0.3-0.2c24.3-14.5,50.4-22,76.4-22   c26.3,0,52.8,7.8,77.5,22.8c0.7,0.4,1.4,0.9,2.1,1.3c0.5,0.3,1.1,0.7,1.6,1c0.6,0.4,1.3,0.8,1.9,1.3c1,0.7,2,1.3,3,2   c0.4,0.3,0.7,0.5,1.1,0.8c0.7,0.5,1.4,1,2.1,1.5c0.4,0.3,0.7,0.5,1.1,0.8c0.6,0.5,1.2,0.9,1.9,1.4c4.4,3.3,10.7,2.4,14-2   c3.1-4.2,2.5-10-1.3-13.4c-0.3-0.2-0.5-0.5-0.8-0.7c-0.6-0.4-1.1-0.8-1.7-1.2c-0.5-0.4-1.1-0.8-1.6-1.2c-0.7-0.5-1.5-1-2.2-1.6   c-0.5-0.4-1-0.7-1.5-1c-0.5-0.4-1.1-0.7-1.6-1.1c2.8-3.3,6.2-6.1,10.1-8.3c17.8-10,40.4-3.6,50.4,14.2c4.8,8.6,6,18.6,3.3,28.1   c-1.9,6.6-5.4,12.4-10.3,17c-0.1-0.1-0.1-0.2-0.2-0.2c-3.1-4.2-6.4-8.2-9.8-12.2c-3.6-4.2-9.9-4.7-14.1-1c-4.2,3.6-4.7,9.9-1,14.1   c0.7,0.8,1.4,1.6,2.1,2.5c0,0,0.1,0.1,0.1,0.1c3.2,3.9,6.3,7.9,9.2,12c0.1,0.1,0.2,0.3,0.3,0.4c0.9,1.2,1.7,2.4,2.5,3.7   c20.6,30.4,32.1,65.3,32.1,98.5C426.4,333.1,409.5,365.6,376.1,388.5z"/><path d="M202.8,238.3c0-4-2.3-7.6-6-9.2l-35.9-15.7c-5.1-2.2-11,0.1-13.2,5.1c-2.2,5.1,0.1,11,5.1,13.2l15,6.6l-15,6.6   c-5.1,2.2-7.4,8.1-5.1,13.2c1.6,3.8,5.3,6,9.2,6c1.3,0,2.7-0.3,4-0.8l35.9-15.7C200.4,245.8,202.8,242.3,202.8,238.3z"/><path d="M365.8,218.5c-2.2-5.1-8.1-7.4-13.2-5.1l-35.9,15.7c-3.6,1.6-6,5.2-6,9.2s2.3,7.6,6,9.2l35.9,15.7c1.3,0.6,2.7,0.8,4,0.8   c3.8,0,7.5-2.2,9.2-6c2.2-5.1-0.1-11-5.1-13.2l-15-6.6l15-6.6C365.7,229.5,368,223.6,365.8,218.5z"/></g><text x="0" y="527" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by AomAm</text><text x="0" y="532" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>
              </div>
              <!-- <v-chip v-for="tag in randomEffect.tags" :key="tag">{{tag}}</v-chip> -->
            </v-flex>
            <v-flex xs8 sm4 offset-sm2>
              <p class="body-1 prompt question">이 영향은 나에게 긍정적인가요? 부정적인가요? </p>
              <v-btn 
                :outline="myEffect.isBenefit !== 1" 
                :dark="myEffect.isBenefit === 1" 
                color="primary" 
                class="binarybtn"
                @click="myEffect.isBenefit=1"> 긍정적 
              </v-btn>
              <v-btn 
                :outline="myEffect.isBenefit !== 0" 
                :dark="myEffect.isBenefit === 0" 
                color="error" 
                class="binarybtn" 
                @click="myEffect.isBenefit=0"> 
                부정적 
              </v-btn>
              <!-- <v-slider
                v-model="myEffect.isBenefit"
                :tick-labels="['매우 부정적','','','', '매우 긍정적']"
                :min="-2"
                :max="2"
                step="1"
                ticks="always"
                tick-size="2"/> -->
            </v-flex>
          </v-layout>
          <p class="body-1 prompt question">이 답에 대해 얼마나 확신하시나요?</p>
          <v-slider
            v-model="myEffect.confidence"
            :tick-labels="['매우 확신 없음','','','', '매우 확신함']"
            :max="4"
            step="1"
            ticks="always"
            tick-size="2"/>
        </template>
        
        <br>
        
      <p v-if="!allFilled" style="color:red;">모든 빈칸을 채워넣어야 다음으로 넘어갈 수 있습니다.</p>
      <v-btn v-if="!allFilled" disabled block> 다음 </v-btn>
      <v-btn v-else dark block color="primary" @click="addEffect">다음</v-btn>    
      </v-form>
    </v-flex>
  </v-layout>
</template>
<script>
// import _ from 'lodash'
import PromisePane from '~/components/PromisePane.vue'
import setTokenMixin from '~/mixins/setToken.js'
import hangulSearchMixin from '~/mixins/hangulSearch.js'
export default {
  // asyncData: async function ({app, store}) {
  //   let stakeholderGroups = await app.$axios.$get('/api/stakeholdergroups/', {
  //     params: {
  //       policy: store.state.policyId
  //     }
  //   })
  //   return {stakeholderGroups: stakeholderGroups.results}
  // },
  components: {
    PromisePane
  },
  mixins: [setTokenMixin, hangulSearchMixin],
  computed: {
    policy: function () {
      return this.$store.state.policy
    },
    allFilled: function () {
      return (this.myEffect.description.length >= 10 && this.myEffect.isBenefit !== -1 && this.selectedTags.length >= 2)
    },
    tags: function () {
      return this.$store.state.tags
    },
    effectSize: function () {
      switch (this.$store.state.userPolicy.effect_size) {
        case 2: {
          return '조금의'
        }
        case 3: {
          return '적당히'
        }
        case 4: {
          return '많은'
        }
      }
      console.log('ERROR')
    },
    nextRoute: function () {
      switch (this.userGroup) {
        case 1:
        case 2:
          // this.$store.commit('setNextstep')
          return '/MiniSurvey'
        case 3:
        case 4:
          return '/TagOverview'
        case 5:
        case 0:
        case -1:
        case 6:
        case 7:
          return '/GuessEffectRandom'
      }
    },
    userGroup: function () {
      // if (!this.$store.state.user.is_participant) {
      //   return -1
      // } else {
      //   return this.$store.getters.experimentCondition
      // }
      return this.$store.getters.userGroup
    }
  },
  data: function () {
    return {
      // TODO: Adjust effect according to the data model
      myEffect: {
        isBenefit: -1,
        stakeholder_detail: '',
        stakeholder_group: 1, // TODO: remove
        tags: [],
        description: '',
        source: 'stakeholder',
        confidence: 0
      },
      etc: '',
      selectedTags: [],
      activator: null,
      attach: null,
      editing: null,
      index: -1,
      menu: false,
      x: 0,
      search: null,
      y: 0
      // hangulSearch: ''
    }
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)
  },
  methods: {
    numToHangul: function (search) {
      if (search.name) {
        return search.name
      }
      const arrNumberWord = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
      // 10,  100,  100 자리수 한글 표시
      const arrDigitWord = ['', '십', '백', '천']
      // 만단위 한글 표시
      const arrManWord = ['', '만', '억', '조']
      // Copyright 취생몽사(http://bemeal2.tistory.com)

      // 소스는 자유롭게 사용가능합니다. Copyright 는 삭제하지 마세요.
      const numStrs = search.match(/\d+/g)
      // console.log(numStrs)
      let newSearchString = search.repeat(1)
      if (!numStrs) {
        return search
      }
      numStrs.forEach((numStr) => {
        // console.log(numStr)
        let hanValue = ''
        let manCount = 0 // 만단위 0이 아닌 금액 카운트.
        const numLength = numStr.length
        for (let i = 0; i < numLength; i++) {
          // 1단위의 문자로 표시.. (0은 제외)
          let strTextWord = arrNumberWord[numStr.charAt(i)]
          // console.log(strTextWord)
          // 0이 아닌경우만,  십/백/천 표시
          if (strTextWord !== '') {
            manCount++
            strTextWord += arrDigitWord[(numLength - (i + 1)) % 4]
          }
          // 만단위마다 표시 (0인경우에도 만단위는 표시한다)
          if (manCount !== 0 && (numLength - (i + 1)) % 4 === 0) {
            manCount = 0
            strTextWord = strTextWord + arrManWord[(numLength - (i + 1)) / 4]
          }
          hanValue += strTextWord
        }

        newSearchString = newSearchString.replace(numStr, hanValue)
      })
      // 출처: http://bemeal2.tistory.com/67 [취생몽사]
      return newSearchString
    },
    onInput (ev) {
      console.log(ev)
      this.selectedTags = ev.map(this.numToHangul)
    },
    addEffect: async function () {
      const result = await this.$validator.validateAll()
      this.myEffect.tags = this.selectedTags
      if (result) {
        // await this.addNewStakeholder()
        this.myEffect.policy = this.$store.state.policyId
        this.$axios.$post('/api/effects/', this.myEffect)
        this.$ga.event({
          eventCategory: '/StateAsStakeholder',
          eventAction: 'AddEffect',
          eventLabel: this.myEffect.stakeholder_detail,
          eventValue: 0
        })
        this.$store.dispatch('incrementUserPolicyStakeholdersAnswered')
        this.$router.push('/GuessEffectRandom')
      }
    }
  }
}
</script>
<style scoped>
.score__btn {
  display: inline-block;
  min-width: 0;
}

.binary__btn{
    width:50%;
    left:25%;
}

.input-group.input-group--dirty.radio-group.radio-group--column {
  padding: 0;
}

.input-group.input-group--text-field.input-group--single-line.primary--text {
  padding: 0;
}

.question {
  margin-top: 5px;
  margin-bottom: 0;
  text-align: left;
}

.triangle-obtuse {
  position:relative;
  padding:1em;
  margin:1em 0 2em;
  /* color:#fff; */
  background:#3f51b540;
  /* css3 */
  /* background:-webkit-gradient(linear, 0 0, 0 100%, from(#f04349), to(#c81e2b));
  background:-moz-linear-gradient(#f04349, #c81e2b);
  background:-o-linear-gradient(#f04349, #c81e2b);
  background:linear-gradient(#f04349, #c81e2b); */
  /* -webkit-border-radius:10px;
  -moz-border-radius:10px; */
  border-radius:0.6em;
}


/* creates the wider right-angled triangle */
.triangle-obtuse:before {
  content:"";
  position:absolute;
  bottom:-2em; /* value = - border-top-width - border-bottom-width */
  left:25%; /* controls horizontal position */
  border:0;
  border-left-width:2em; /* vary this value to change the angle of the vertex */
  border-bottom-width:2em; /* vary this value to change the height of the triangle. must be equal to the corresponding value in :after */
  border-style:solid;
  border-color:transparent #3f51b540;
  /* reduce the damage in FF3.0 */
  display:block;
  width:0;
}

/* creates the narrower right-angled triangle */
.triangle-obtuse:after {
  content:"";
  position:absolute;
  bottom:-2em; /* value = - border-top-width - border-bottom-width */
  left:25%; /* value = (:before's left) + (:before's border-right/left-width)  - (:after's border-right/left-width) */
  border:0;
  border-left-width:0.625em; /* vary this value to change the angle of the vertex */
  border-bottom-width:2em; /* vary this value to change the height of the triangle. must be equal to the corresponding value in :before */
  border-style:solid;
  border-color:transparent #fafafa;
  /* reduce the damage in FF3.0 */
  display:block;
  width:0;
}
</style>
