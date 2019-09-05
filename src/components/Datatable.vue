<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="items"
            :loading="loading"
            :rows-per-page-items="itemsPerPageArray"
            :total-items="paginationProps.totalItems" 
            :pagination.sync="paginationProps"
            hide-actions
            class="elevation-1"
        >
            <template slot="items" slot-scope="scope">
                <slot name="items" v-bind="scope"/>
            </template>
        </v-data-table>
        
        <v-container grid-list-md text-xs-center>
            <v-layout row wrap align-center justify-space-around>
                <v-flex>
                    <span>
                        <v-select
                            @change="next"
                            v-model="paginationProps.rowsPerPage"
                            :items="itemsPerPageArray"
                        >
                        </v-select>
                    </span>
                </v-flex>
                <v-flex>
                    <v-pagination 
                            v-model="paginationProps.page" 
                            :length="pages" 
                            :total-visible="7" 
                            @input="next"></v-pagination>
                </v-flex>
                <v-flex class="text-xs-right">
                    Page {{ this.paginationProps.page }} of {{ pages }}
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    props:{
        headers: {
            type: Array,
            required:true
        },
        items: {
            type:Array,
            required: true
        },
        pagination: {
            type: Object,
            required: true
        },
        loading: Boolean
    },
    mounted() {
        this.$emit('change', this.paginationProps);
    },
    data() {
        return {
            // pagination: {
            //     descending: null,
            //     page: 1,
            //     rowsPerPage: '1',
            //     sortBy: null,
            //     totalItems: 0,
            //     visibleElements: 7
            // },
            itemsPerPageArray: ['1','5', '10', '20', '50']
        }
    },
    methods:{
        next() {
            this.$emit('change', this.paginationProps);
        }
    },
    computed: {
      pages () {
        if (this.paginationProps.rowsPerPage == null ||
          this.paginationProps.totalItems == null
        ) return 0;

        let pages = Math.ceil(this.paginationProps.totalItems / this.paginationProps.rowsPerPage);
        if(pages === 0) return 1;
        return pages;
      },
      paginationProps: {
          get: function() {
              return this.pagination;
          },
          set:function(value) {
              console.log(value);
          }
          
      }
    },
    watch: {
        "pagination.descending": {
            handler : function(val, oldVal) {
                console.log(val);
                console.log(oldVal);
                this.$emit('change', this.paginationProps);
            }
        }
    }

}
</script>